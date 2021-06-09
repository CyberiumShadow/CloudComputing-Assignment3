const express = require('express');
const multer = require('multer');
const { GetItemCommand, PutItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
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
  // const { Items } = await dbClient.send(new ScanCommand(bookingParams));
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
        },
      };
      await dbClient.send(new PutItemCommand(newCarParams));
      await s3Client.send(new PutObjectCommand(uploadParams));
      return res.status(200).send({ message: 'Car Listed' });
    }
    return res.status(409).json({ message: 'Car already listed' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
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
    },
  };
  try {
    await dbClient.send(new PutItemCommand(newBookingParams));
    return res.status(200).json({ booking_id: newID });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
