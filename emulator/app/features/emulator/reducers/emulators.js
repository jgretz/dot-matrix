import produce from 'immer';
import {stateReducer} from 'truefit-redux-utils';
import uuid from 'uuid';

import {NEW_EMULATOR} from '../actions';

export default stateReducer([], {
  [NEW_EMULATOR]: (state, payload) =>
    produce(state, draft => {
      draft.push({
        id: uuid.v4(),
        frame: payload,
      });
    }),
});
