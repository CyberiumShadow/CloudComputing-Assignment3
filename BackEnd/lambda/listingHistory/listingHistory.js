const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

const dbClient = new DynamoDBClient({
  region: "us-east-1",
});

exports.handler = async (event) => {
  console.log(event);
  const {
    pathParameters: { userid },
  } = event;
  const queryCarsParams = {
    TableName: "cars",
    IndexName: "Cars_Owner",
    KeyConditionExpression: "#owner = :owner",
    ProjectionExpression: "licence_plate, make, model, #year",
    ExpressionAttributeNames: {
      "#owner": "owner",
      "#year": "year",
    },
    ExpressionAttributeValues: {
      ":owner": { S: userid },
    },
  };
  console.log(queryCarsParams);
  try {
    const { Items } = await dbClient.send(new QueryCommand(queryCarsParams));
    console.log(Items);
    if (Items.length > 0) {
      const cars = Items.map((Item) => ({
        licence_plate: Item.licence_plate.S,
        car: `${Item.make.S} ${Item.model.S} ${Item.year.N}`,
      }));
      console.log(cars);
      const bookings = [];
      await Promise.all(
        cars.map(async (car) => {
          const queryBookingParams = {
            TableName: "bookings",
            KeyConditionExpression: "licence_plate = :licence_plate",
            FilterExpression: "#status = :status",
            ExpressionAttributeNames: {
              "#status": "status",
            },
            ExpressionAttributeValues: {
              ":licence_plate": { S: car.licence_plate },
              ":status": { S: "Completed" },
            },
          };
          const results = (
            await dbClient.send(new QueryCommand(queryBookingParams))
          ).Items;
          console.log(results);
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
      console.log(bookings);
      const response = {
        statusCode: 200,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookings),
      };
      console.log(response);
      return response;
    }
    const response = {
      statusCode: 404,
      body: JSON.stringify({ message: "No Completed Bookings" }),
    };
    return response;
  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
    return response;
  }
};
