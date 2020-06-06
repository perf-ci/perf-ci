import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PublicHome from './containers/PublicHome';
import NotFound from './containers/NotFound';

import AppliedRoute from './components/AppliedRoute';


// eslint-disable-next-line require-jsdoc
export default function Routes(services) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={PublicHome} services={services}/>
      {/* eslint-disable-next-line max-len */}
      {/* <AppliedRoute path="/login" exact component={Login} services={services}/>*/}

      {/* Private zone*/}
      {/* <PrivateRoute path="/dashboard"*/}
      {/*              exact component={Dashboard} services={services}/>*/}
      <Route component={NotFound}/>
    </Switch>
  );
}
