const express = require('express');
const multer = require('multer');
const { GetItemCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { dbClient, s3Client } = require('../lib/aws');

const router = express.Router();
const uploader = multer();

router.get('/', (req, res) => {
  console.log(res.locals);
  res.status(501).send('Not Implemented');
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
  const { Item } = await dbClient.send(new GetItemCommand(params));
  if (!Item) {
    const newUserParams = {
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
    await dbClient.send(new PutItemCommand(newUserParams));
    await s3Client.send(new PutObjectCommand(uploadParams));
    return res.status(200).send({ message: 'Car Listed' });
  }
  return res.status(409).json({ message: 'Car already listed' });
});

router.get('/:carid/', (req, res) => {
  res.status(501).send('Not Implemented');
});

module.exports = router;
