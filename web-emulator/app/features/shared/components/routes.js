import React from 'react';
import {Switch, Route} from 'react-router';

import {Emulator} from '../../display/components';
import NotFound from './notFound';

export default () => (
  <Switch>
    <Route exact path="/" component={Emulator} />

    <Route component={NotFound} />
  </Switch>
);
