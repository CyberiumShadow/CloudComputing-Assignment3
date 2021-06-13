const express = require('express');
const { QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { dbClient } = require('../lib/aws');

const router = express.Router();

router.get('/:userid/currentBookings', async (req, res) => {
  const {
    params: { userid },
  } = req;
  try {
    const queryBookingParams = {
      TableName: 'bookings',
      IndexName: 'Booking_UserID',
      KeyConditionExpression: 'user_id = :userid',
      FilterExpression: '#status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':userid': { S: userid },
        ':status': { S: 'Booked' },
      },
    };
    const { Items } = await dbClient.send(new QueryCommand(queryBookingParams));
    if (Items.length > 0) {
      const currentBookings = Items.map((Item) => ({
        booking_id: Item.booking_id.S,
        licence_plate: Item.licence_plate.S,
        user_id: userid,
        start_time: Item.start_time.N,
        end_time: Item.end_time.N,
        cost: Item.cost.N,
        image: Item.image.S,
        status: Item.status.S,
      }));
      return res.status(200).json(currentBookings);
    }
    return res.status(404).json({ message: 'No Current Booking' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/:userid/currentListings', async (req, res) => {
  const {
    params: { userid },
  } = req;
  try {
    const queryListingParams = {
      TableName: 'cars',
      IndexName: 'Cars_Owner',
      KeyConditionExpression: '#owner = :owner',
      ExpressionAttributeNames: {
        '#owner': 'owner',
      },
      ExpressionAttributeValues: {
        ':owner': { S: userid },
      },
    };
    const { Items } = await dbClient.send(new QueryCommand(queryListingParams));
    if (Items.length > 0) {
      const currentListings = Items.map((Item) => ({
        licence_plate: Item.licence_plate.S,
        owner: userid,
        make: Item.make.S,
        model: Item.model.S,
        year: Item.year.N,
        address: Item.address.S,
        minHour: Item.minHour.N,
        price: Item.price.N,
        image: Item.image.S,
      }));
      return res.status(200).json(currentListings);
    }
    return res.status(404).json({ message: 'No Current Listings' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/:userid/bookingHistory', async (req, res) => {
  const {
    params: { userid },
  } = req;
  const queryBookingParams = {
    TableName: 'bookings',
    IndexName: 'Booking_UserID',
    KeyConditionExpression: 'user_id = :userid',
    FilterExpression: '#status = :status',
    ExpressionAttributeNames: {
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':userid': { S: userid },
      ':status': { S: 'Completed' },
    },
  };
  try {
    const { Items } = await dbClient.send(new QueryCommand(queryBookingParams));
    if (Items.length > 0) {
      const completedBookings = await Promise.all(
        Items.map(async (Booking) => {
          const getOwnerParams = {
            TableName: 'cars',
            Key: {
              licence_plate: { S: Booking.licence_plate.S },
            },
            ExpressionAttributeNames: {
              '#owner': 'owner',
              '#year': 'year',
            },
            ProjectionExpression: '#owner, make, model, #year',
          };
          const {
            Item: { owner, make, model, year },
          } = await dbClient.send(new GetItemCommand(getOwnerParams));
          return {
            booking_id: Booking.booking_id.S,
            licence_plate: Booking.licence_plate.S,
            owner: owner.S,
            car: `${make.S} ${model.S} ${year.N}`,
            start_time: Booking.start_time.N,
            end_time: Booking.end_time.N,
            cost: Booking.cost.N,
          };
        })
      );
      return res.status(200).json(completedBookings);
    }
    return res.status(404).json({ message: 'No Completed Bookings' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/:userid/listingHistory', async (req, res) => {
  const {
    params: { userid },
  } = req;
  const queryCarsParams = {
    TableName: 'cars',
    IndexName: 'Cars_Owner',
    KeyConditionExpression: '#owner = :owner',
    ProjectionExpression: 'licence_plate, make, model, #year',
    ExpressionAttributeNames: {
      '#owner': 'owner',
      '#year': 'year',
    },
    ExpressionAttributeValues: {
      ':owner': { S: userid },
    },
  };
  try {
    const { Items } = await dbClient.send(new QueryCommand(queryCarsParams));
    if (Items.length > 0) {
      const cars = Items.map((Item) => ({
        licence_plate: Item.licence_plate.S,
        car: `${Item.make.S} ${Item.model.S} ${Item.year.N}`,
      }));
      const bookings = [];
      await Promise.all(
        cars.map(async (car) => {
          const queryBookingParams = {
            TableName: 'bookings',
            KeyConditionExpression: 'licence_plate = :licence_plate',
            FilterExpression: '#status = :status',
            ExpressionAttributeNames: {
              '#status': 'status',
            },
            ExpressionAttributeValues: {
              ':licence_plate': { S: car.licence_plate },
              ':status': { S: 'Completed' },
            },
          };
          const results = (await dbClient.send(new QueryCommand(queryBookingParams))).Items;
          results.map((Item) =>
            bookings.push({
              customer: Item.user_id.S,
              licence_plate: car.licence_plate,
              car: car.car,
              start_time: Item.start_time.N,
              end_time: Item.end_time.N,
              cost: Item.cost.N,
            })
          );
        })
      );
      return res.status(200).send(bookings);
    }
    return res.status(404).json({ message: 'No Completed Bookings' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
