import React from "react";
import {Route} from "react-router-dom";

export default function AppliedRoute({component: C, services, ...rest}) {
  return (
    <Route {...rest} render={props => <C {...props} {...services} />}/>
  );
}