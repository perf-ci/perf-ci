import React from 'react';
import {Redirect, Route} from 'react-router-dom';

// eslint-disable-next-line react/prop-types,require-jsdoc,max-len
export default function PrivateRoute({component: Component, services, ...rest}) {
  return (<Route {...rest} render={(props) => (
    // eslint-disable-next-line react/prop-types
    services.services.authenticationService.isAuthenticated ?
      <Component {...props} {...services} /> :
      <Redirect to='/'/>
  )}/>);
}
