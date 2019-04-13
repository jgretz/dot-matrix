import React from 'react';
import {Switch, Route} from 'react-router';

import {Dashboard} from '../../command/components';
import NotFound from './notFound';

export default () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />

    <Route component={NotFound} />
  </Switch>
);
