import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/privateroute';
import PublicRoute from './components/public-route/publicroute';
import MainLayout from './layouts/Main/Main';

import { Dashboard as DashboardView } from './views';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={PublicRoute} />
      <Route path="/register" component={PublicRoute} />
      <Switch>
        <PrivateRoute component={DashboardView} layout={MainLayout} path="/dashboard" />
      </Switch>
    </Router>
  );
};

export default Routes;
