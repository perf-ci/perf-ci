import React from "react";
import {Redirect, Route} from "react-router-dom"

export default function PrivateRoute({component: Component, services, ...rest}) {
  return (<Route {...rest} render={(props) => (
    services.services.authenticationService.isAuthenticated
      ? <Component {...props} {...services} />
      : <Redirect to='/login'/>
  )}/>);
}