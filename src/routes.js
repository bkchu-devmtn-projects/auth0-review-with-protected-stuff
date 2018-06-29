import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routeA from './components/routeA';
import routeB from './components/routeB';
import routeC from './components/routeC';

export default (
  <Switch>
    <Route path="/routeA" component={routeA} />
    <Route path="/routeB" component={routeB} />
    <Route path="/routeC" component={routeC} />
  </Switch>
);
