import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Auth files
import App from './App';
import Login from './components/auth/login';
import SignUp from './components/auth/signUp';

// Main files
import Dashboard from './components/main/dashboard';
import Profile from './components/main/profile';
import HireCar from './components/main/hireCar';
import ListCar from './components/main/listCar';
import Stats from './components/main/stats';

// AWS Amplify
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/hire-car" component={HireCar} />
        <Route path="/list-car" component={ListCar} />
        <Route path="/stats" component={Stats} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);