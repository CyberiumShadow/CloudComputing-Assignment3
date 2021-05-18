import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from 'libs/context';

function AuthenticatedRoute({ children, ...rest }) {
  const { authentication } = useAppContext();
  
  return (
    <Route {...rest}>
      {authentication.isAuthenticated ? (children) : (<Redirect to={`/`} />)}
    </Route>
  );
}

export default AuthenticatedRoute;