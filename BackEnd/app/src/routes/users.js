const express = require('express');
const { GetItemCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');
const { dbClient } = require('../lib/aws');

const router = express.Router();

router.get('/:userid/currentBooking', async (req, res) => {
  const {
    params: { userid },
  } = req;
  const getUserParams = {
    TableName: 'users',
    Key: {
      username: { S: userid },
    },
    ProjectionExpression: 'currentBooking',
  };
  try {
    const { Item } = await dbClient.send(new GetItemCommand(getUserParams));
    if (Item) {
      const bookingid = Item.currentBooking.S;
      const queryBookingParams = {
        TableName: 'bookings',
        IndexName: 'Booking_UserID',
        KeyConditionExpression: 'user_id = :userid AND booking_id = :bookingid',
        ExpressionAttributeValues: {
          ':userid': { S: userid },
          ':bookingid': { S: bookingid },
        },
      };
      const { Items } = await dbClient.send(new QueryCommand(queryBookingParams));
      if (Items.length > 0) {
        const currentBooking = {
          booking_id: Items[0].booking_id.S,
          licence_plate: Items[0].licence_plate.S,
          user_id: userid,
          start_time: Items[0].start_time.N,
          end_time: Items[0].end_time.N,
          cost: Items[0].cost.N,
          status: Items[0].status.S,
        };
        return res.status(200).json(currentBooking);
      }
      return res.status(404).json({ message: 'No Current Booking' });
    }
    return res.status(404).json({ message: 'User Not Found' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/:userid/currentListing', async (req, res) => {
  const {
    params: { userid },
  } = req;
  const getUserParams = {
    TableName: 'users',
    Key: {
      username: { S: userid },
    },
    ProjectionExpression: 'currentListing',
  };
  try {
    const { Item } = await dbClient.send(new GetItemCommand(getUserParams));
    if (Item) {
      const carid = Item.currentListing.S;
      const queryListingParams = {
        TableName: 'cars',
        KeyConditionExpression: 'licence_plate = :licenceplate',
        FilterExpression: '#owner = :owner',
        ExpressionAttributeNames: {
          '#owner': 'owner',
        },
        ExpressionAttributeValues: {
          ':owner': { S: userid },
          ':licenceplate': { S: carid },
        },
      };
      const { Items } = await dbClient.send(new QueryCommand(queryListingParams));
      if (Items.length > 0) {
        const currentListing = {
          licence_plate: Items[0].licence_plate.S,
          owner: userid,
          make: Items[0].make.S,
          model: Items[0].model.S,
          year: Items[0].year.N,
          address: Items[0].address.S,
          minHour: Items[0].minHour.N,
          price: Items[0].price.N,
        };
        return res.status(200).json(currentListing);
      }
      return res.status(404).json({ message: 'No Current Booking' });
    }
    return res.status(404).json({ message: 'User Not Found' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
