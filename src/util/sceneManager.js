/* eslint-disable no-console */
import _ from 'lodash';
import {createBlankFrame} from '../frames';
import {REFRESH_RATE, HEIGHT, WIDTH} from '../constants';

// the pixel sdk represents the grid as a single dimensioned array of length 128.
// I prefer to think of the display as a 2-dimensioned array (16x8).
// this class abstracts this mapping as well as the concepts of scenes so calling
// code can just worry about content

// helper functions
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

export default class SceneManager {
  constructor(pixel) {
    this.state = {
      pixel,
      stack: [createBlankFrame()],
    };

    // this is a bit of a hack but is required for "this" to resolve correctly
    this.loop = () => {
      this.refreshLoop();
    };

    setTimeout(this.loop, REFRESH_RATE);
  }

  // event loop
  async refreshLoop() {
    const {stack} = this.state;

    // nothing to stream yet
    if (stack.length === 0) {
      setTimeout(this.loop, REFRESH_RATE);
      return;
    }

    // stream frame
    const frame = flatten(stack[0]);
    const success = await this.streamFrame(frame);

    // see if we need to move onto a new frame
    if (success && stack.length > 1) {
      this.state.stack = _.tail(stack);
    }

    // restart
    setTimeout(this.loop, REFRESH_RATE);
  }

  async streamFrame(frame) {
    const {pixel} = this.state;

    if (!pixel) {
      // console.warn('No pixel device is connected');
      return false;
    }

    try {
      await pixel.streamFrame(frame);

      return true;
    } catch (err) {
      console.error('Problem streaming frame');
      console.error(err);

      return false;
    }
  }

  // public interface
  pushFrame(frame) {
    this.state.stack.push(frame);
  }
}
