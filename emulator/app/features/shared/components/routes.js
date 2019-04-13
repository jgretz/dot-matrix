import React from 'react';
import {Switch, Route} from 'react-router';

import {EmulatorArray} from '../../emulator/components';
import NotFound from './notFound';

export default () => (
  <Switch>
    <Route exact path="/" component={EmulatorArray} />

    <Route component={NotFound} />
  </Switch>
);
