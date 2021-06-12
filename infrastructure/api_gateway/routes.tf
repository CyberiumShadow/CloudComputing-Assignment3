resource "aws_apigatewayv2_route" "root" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "GET /"
  authorization_type = "NONE"
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}

resource "aws_apigatewayv2_route" "getUserCurrentBookings" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "GET /users/{userid}/currentBookings"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}

resource "aws_apigatewayv2_route" "getUserCurrentListings" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "GET /users/{userid}/currentListings"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}


resource "aws_apigatewayv2_route" "getCars" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "GET /cars"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}

resource "aws_apigatewayv2_route" "postCar" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "POST /cars"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}

resource "aws_apigatewayv2_route" "editCar" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "PATCH /cars/{carid}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}

resource "aws_apigatewayv2_route" "deleteCar" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "DELETE /cars/{carid}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}

resource "aws_apigatewayv2_route" "postCarBookings" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "POST /cars/{carid}/bookings"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}

resource "aws_apigatewayv2_route" "postCarBookingCompletion" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "POST /cars/{carid}/bookings/{bookingid}/complete"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}

resource "aws_apigatewayv2_route" "deleteCarBooking" {
  api_id             = aws_apigatewayv2_api.neocar_api.id
  route_key          = "DELETE /cars/{carid}/bookings/{bookingid}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.JWT.id
  target             = "integrations/${aws_apigatewayv2_integration.cars.id}"
}
