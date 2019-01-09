/* eslint-disable no-console */
import _ from 'lodash';
import connectToPixel from './connectToPixel';
import {createBlankFrame} from '../frames';
import {REFRESH_RATE, HEIGHT, WIDTH} from '../constants';

const state = {
  pixel: null,
  stack: [],
};

const streamFrame = async frame => {
  if (!state.pixel) {
    // console.warn('No pixel device is connected');
    return false;
  }

  try {
    await state.pixel.streamFrame(frame);

    return true;
  } catch (err) {
    console.error('Problem streaming frame');
    console.error(err);

    return false;
  }
};

// the pixel sdk represents the grid as a single dimensioned array of length 128.
// I prefer to think of the display as a 2-dimensioned array (16x8).
// this is the magic to let me do it
const flatten = frame => {
  const array = [];
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      const position = j * WIDTH + i;

      array[position] = frame[i][j];
    }
  }

  return array;
};

const refreshLoop = async () => {
  // nothing to stream yet
  if (state.stack.length === 0) {
    setTimeout(refreshLoop, REFRESH_RATE);
    return;
  }

  // stream frame
  const frame = flatten(state.stack[0]);
  const success = await streamFrame(frame);

  // see if we need to move onto a new frame
  if (success && state.stack.length > 1) {
    state.stack = _.tail(state.stack);
  }

  // restart
  setTimeout(refreshLoop, REFRESH_RATE);
};

// public api
export const pushFrame = frame => {
  state.stack.push(frame);
};

export const initializePixel = async () => {
  // initialize device
  state.pixel = await connectToPixel();

  // initialize stack
  pushFrame(createBlankFrame());

  // start refresh
  setTimeout(refreshLoop, REFRESH_RATE);
};
