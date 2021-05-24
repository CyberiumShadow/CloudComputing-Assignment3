const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { S3Client } = require('@aws-sdk/client-s3');

const dbClient = new DynamoDBClient({
  region: 'us-east-1',
});

const s3Client = new S3Client({
  region: 'us-east-1',
});

module.exports = {
  dbClient,
  s3Client,
};
