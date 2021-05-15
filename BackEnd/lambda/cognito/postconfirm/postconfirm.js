const { DynamoDBClient, GetItemCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const dbClient = new DynamoDBClient({
  region: "us-east-1",
});

exports.handler = async (event, context, callback) => {
  const {userName, request: {userAttributes, validationData}} = event;
  const params = {
    TableName: "neocar_users",
    Key: {
      username: { S: userName },
    },
  };
  const { Item } = await dbClient.send(new GetItemCommand(params));
  if (!Item) {
    const newUserParams = {
      TableName: "neocar_users",
      Item: {
        username: { S: userName },
      },
    };
    await dbClient.send(new PutItemCommand(newUserParams));
  }
  // Return to Amazon Cognito
  callback(null, event);
};
