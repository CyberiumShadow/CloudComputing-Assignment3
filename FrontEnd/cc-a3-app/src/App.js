import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { AppContext } from "libs/context";
import { Auth } from "aws-amplify";

// Auth components
import Login from 'components/auth/login';
import SignUp from 'components/auth/signUp';

// Auth routes
import AuthenticatedRoute from 'components/auth/authenticatedRoute';
import UnauthenticatedRoute from 'components/auth/unauthenticatedRoute';

// Main components
import Dashboard from 'components/main/dashboard';
import Profile from 'components/main/profile';
import HireCar from 'components/main/hireCar';
import ListCar from 'components/main/listCar';
import Stats from 'components/main/stats';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        console.log(e)
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <UnauthenticatedRoute exact path="/signup"><SignUp /></UnauthenticatedRoute>

          <AuthenticatedRoute exact path="/dashboard"><Dashboard /></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/profile"><Profile /></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/hire-car"><HireCar /></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/list-car"><ListCar /></AuthenticatedRoute>
          <AuthenticatedRoute exact path="/stats"><Stats /></AuthenticatedRoute>
        </Switch>
      </AppContext.Provider>
    )
  );
}

export default App;