import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import Update from '../pages/Update';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/register" component={Register} />
      <Route path="/update/:id" component={Update} />
    </Switch>
  );
}
