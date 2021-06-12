const express = require('express');
const multer = require('multer');
const {
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  DeleteItemCommand,
  QueryCommand,
  BatchWriteItemCommand,
  UpdateItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { nanoid } = require('nanoid');
const { dbClient, s3Client } = require('../lib/aws');

const router = express.Router();
const uploader = multer();

const processItems = (data) => {
  const processedData = [];
  data.map((car) => {
    processedData.push({
      licence_plate: car.licence_plate.S,
      ...(car.make && { make: car.make.S }),
      ...(car.model && { model: car.model.S }),
      ...(car.owner && { owner: car.owner.S }),
      ...(car.year && { year: car.year.N }),
      ...(car.price && { price: car.price.N }),
      ...(car.minHour && { minHour: car.minHour.N }),
      ...(car.address && { address: car.address.S }),
    });
  });
  return processedData;
};

router.get('/', async (req, res) => {
  const carParams = {
    TableName: 'cars',
  };
  const { Items } = await dbClient.send(new ScanCommand(carParams));
  if (Items.length === 0)
    return res.status(200).json({ message: 'No result is retrieved. Please query again' });
  return res.status(200).json(processItems(Items));
});

router.post('/', uploader.single('image'), async (req, res) => {
  const {
    file: { mimetype, buffer },
    body: { make, model, year, plate, price, minHour, address, owner },
  } = req;
  const uploadParams = {
    Bucket: 'cdn.neocar.link',
    Key: `cars/${plate}.${mimetype.split('/')[1]}`,
    Body: buffer,
  };
  const params = {
    TableName: 'cars',
    Key: {
      licence_plate: { S: plate },
    },
  };
  try {
    const { Item } = await dbClient.send(new GetItemCommand(params));
    if (!Item) {
      const newCarParams = {
        TableName: 'cars',
        Item: {
          owner: { S: owner },
          licence_plate: { S: plate },
          make: { S: make },
          model: { S: model },
          year: { N: year },
          price: { N: price },
          minHour: { N: minHour },
          address: { S: address },
          image: { S: `https://${uploadParams.Bucket}/${uploadParams.Key}` },
        },
      };
      const updateUserParams = {
        TableName: 'users',
        Key: {
          username: { S: owner },
        },
        ExpressionAttributeValues: {
          ':plate': { S: plate },
        },
        UpdateExpression: 'SET currentListing = :plate',
      };
      await dbClient.send(new PutItemCommand(newCarParams));
      await dbClient.send(new UpdateItemCommand(updateUserParams));
      await s3Client.send(new PutObjectCommand(uploadParams));
      return res.status(200).send({ message: 'Car Listed' });
    }
    return res.status(409).json({ message: 'Car already listed' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.patch('/:carid', async (req, res) => {
  const {
    params: { carid },
    body: { price, minHour, address },
  } = req;
  const params = {
    TableName: 'cars',
    Key: {
      licence_plate: { S: carid },
    },
  };
  try {
    const { Item } = await dbClient.send(new GetItemCommand(params));
    console.log(Item);
    if (Item) {
      const patchCarParams = {
        TableName: 'cars',
        Key: {
          licence_plate: { S: carid },
        },
        ExpressionAttributeNames: {
          '#price': 'price',
          '#minHour': 'minHour',
          '#address': 'address',
        },
        ExpressionAttributeValues: {
          ':price': { N: `${price}` },
          ':minHour': { N: `${minHour}` },
          ':address': { S: address },
        },
        UpdateExpression: 'SET #price = :price, #minHour = :minHour, #address = :address',
      };
      await dbClient.send(new UpdateItemCommand(patchCarParams));
      return res.status(200).send({ message: `${carid} updated` });
    }
    return res.status(409).json({ message: `${carid} does not exist` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.delete('/:carid', async (req, res) => {
  const {
    params: { carid },
  } = req;
  const deleteCarParams = {
    TableName: 'cars',
    Key: {
      licence_plate: { S: carid },
    },
  };
  const queryBookingParams = {
    TableName: 'bookings',
    KeyConditionExpression: '#carid = :carid',
    ExpressionAttributeNames: {
      '#carid': 'licence_plate',
    },
    ExpressionAttributeValues: {
      ':carid': { S: carid },
    },
  };
  try {
    const { Items } = await dbClient.send(new QueryCommand(queryBookingParams));
    if (Items.length > 0) {
      const batchItems = Items.map((booking) => ({
        DeleteRequest: {
          Key: {
            licence_plate: booking.licence_plate,
            booking_id: booking.booking_id,
          },
        },
      }));
      const batchDeleteParams = {
        RequestItems: {
          bookings: batchItems,
        },
      };
      await dbClient.send(new BatchWriteItemCommand(batchDeleteParams));
    }
    await dbClient.send(new DeleteItemCommand(deleteCarParams));
    return res.status(200).json({ message: `${carid} deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post('/:carid/bookings', async (req, res) => {
  const { body, params } = req;
  const newID = nanoid(10);
  const newBookingParams = {
    TableName: 'bookings',
    Item: {
      booking_id: { S: newID },
      licence_plate: { S: params.carid },
      user_id: { S: body.customer },
      start_time: { N: `${body.start_time}` },
      end_time: { N: `${body.end_time}` },
      cost: { N: `${body.cost}` },
      status: { S: 'Booked' },
    },
  };
  const updateUserParams = {
    TableName: 'users',
    Key: {
      username: { S: body.customer },
    },
    ExpressionAttributeValues: {
      ':booking': { S: newID },
    },
    UpdateExpression: 'SET currentBooking = :booking',
  };
  try {
    await dbClient.send(new PutItemCommand(newBookingParams));
    await dbClient.send(new UpdateItemCommand(updateUserParams));
    return res.status(200).json({ booking_id: newID });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.delete('/:carid/bookings/:bookingid', async (req, res) => {
  const {
    params: { carid, bookingid },
  } = req;
  const deleteBookingParams = {
    TableName: 'bookings',
    Key: {
      licence_plate: { S: carid },
      booking_id: { S: bookingid },
    },
  };
  try {
    await dbClient.send(new DeleteItemCommand(deleteBookingParams));
    return res.status(200).json({ message: `${bookingid} deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post('/:carid/bookings/:bookingid/complete', async (req, res) => {
  const {
    params: { carid, bookingid },
  } = req;
  const updateBookingParams = {
    TableName: 'bookings',
    Key: {
      licence_plate: { S: carid },
      booking_id: { S: bookingid },
    },
    UpdateExpression: 'SET #status = :status',
    ExpressionAttributeNames: {
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':status': { S: 'Completed' },
    },
    ReturnValues: 'ALL_NEW',
  };
  try {
    const {
      Attributes: { user_id },
    } = await dbClient.send(new UpdateItemCommand(updateBookingParams));
    const updateUserParams = {
      TableName: 'users',
      Key: {
        username: user_id,
      },
      UpdateExpression: 'SET currentBooking = :currentBooking',
      ExpressionAttributeValues: {
        ':currentBooking': { S: '' },
      },
    };
    await dbClient.send(new UpdateItemCommand(updateUserParams));
    return res.status(200).json({ message: `Booking ${bookingid} completed` });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
