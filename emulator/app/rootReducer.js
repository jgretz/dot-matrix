/* eslint-disable sort-imports */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import emulator from './features/emulator/reducers';

const rootReducer = history => combineReducers({
  features: combineReducers({
    emulator: emulator,
  }),
  router: connectRouter(history),
});

export default rootReducer;
