import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "@aws-amplify/core";
import { BrowserRouter } from "react-router-dom";
import config from "./config";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

Amplify.configure({
  Auth: {
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    mandatorySignIn: true
  }
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);