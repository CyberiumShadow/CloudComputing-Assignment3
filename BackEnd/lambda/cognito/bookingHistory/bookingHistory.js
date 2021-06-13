const {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
} = require("@aws-sdk/client-dynamodb");

const dbClient = new DynamoDBClient({
  region: "us-east-1",
});

exports.handler = async (event) => {
  console.log(event);
  const {
    pathParameters: { userid },
  } = event;
  const queryBookingParams = {
    TableName: "bookings",
    IndexName: "Booking_UserID",
    KeyConditionExpression: "user_id = :userid",
    FilterExpression: "#status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":userid": { S: userid },
      ":status": { S: "Completed" },
    },
  };
  console.log(queryBookingParams);
  try {
    const { Items } = await dbClient.send(new QueryCommand(queryBookingParams));
    console.log(Items);
    if (Items.length > 0) {
      const completedBookings = await Promise.all(
        Items.map(async (Booking) => {
          const getOwnerParams = {
            TableName: "cars",
            Key: {
              licence_plate: { S: Booking.licence_plate.S },
            },
            ExpressionAttributeNames: {
              "#owner": "owner",
              "#year": "year",
            },
            ProjectionExpression: "#owner, make, model, #year",
          };
          const {
            Item: { owner, make, model, year },
          } = await dbClient.send(new GetItemCommand(getOwnerParams));
          console.log("get owner");
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
      const response = {
        statusCode: 200,
        body: completedBookings,
      };
      return response;
    }
    const response = {
      statusCode: 404,
      body: { message: "No Completed Bookings" },
    };
    return response;
  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 500,
      body: err,
    };
    return response;
  }
};
