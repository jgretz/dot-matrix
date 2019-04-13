import React from 'react';
import {connect} from 'react-redux';
import {pipe, lifecycle} from '@synvox/rehook';

import Emulator from './emulator';

import {createEmulator} from '../actions';
import {emulatorsSelector} from '../selectors';

// this is going to get factored out to the conductor shortly
import {DEFAULT_COLOR, WIDTH, HEIGHT} from '../../shared/constants';

const createFrame = () => {
  const frame = [];
  for (let i = 0; i < HEIGHT; i++) {
    frame[i] = [];

    for (let j = 0; j < WIDTH; j++) {
      frame[i][j] = DEFAULT_COLOR;
    }
  }

  return frame;
};

const Emulators = ({emulators}) => (
  <div>
    {emulators.map(e => (
      <Emulator key={e.id} emulator={e} />
    ))}
  </div>
);

// compose
const ComposedEmulators = pipe(
  lifecycle({
    componentDidMount() {
      this.props.createEmulator(createFrame());
    },
  }),
  Emulators,
);

// redux
const mapStateToProps = state => ({
  emulators: emulatorsSelector(state),
});

export default connect(
  mapStateToProps,
  {createEmulator},
)(ComposedEmulators);
