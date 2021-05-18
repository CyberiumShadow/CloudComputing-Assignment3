import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from 'libs/context';

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function UnauthenticatedRoute({ children, ...rest }) {
  const { authentication } = useAppContext();
  const redirect = querystring('redirect');

  return (
    <Route {...rest}>
      {!authentication.isAuthenticated ? (
        children
      ) : (
        <Redirect to={redirect === '' || redirect === null ? '/' : redirect} />
      )}
    </Route>
  );
}

export default UnauthenticatedRoute;