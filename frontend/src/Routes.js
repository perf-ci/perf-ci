import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PublicHome from './containers/PublicHome';
import NotFound from './containers/NotFound';
import Dashboard from './containers/Dashboard';
import AppliedRoute from './components/AppliedRoute';
import PrivateRoute from './components/PrivateRoute';


// eslint-disable-next-line require-jsdoc
export default function Routes(services) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={PublicHome} services={services}/>
      {/* eslint-disable-next-line max-len */}
      {/* <AppliedRoute path="/login" exact component={Login} services={services}/>*/}

      <PrivateRoute path="/dashboard"
        exact component={Dashboard} services={services}/>
      <Route component={NotFound}/>
    </Switch>
  );
}
