import {DEFAULT_COLOR, WIDTH, HEIGHT} from '../constants';

export default () => {
  const frame = [];
  for (let i = 0; i < WIDTH; i++) {
    frame[i] = [];

    for (let j = 0; j < HEIGHT; j++) {
      frame[i][j] = DEFAULT_COLOR;
    }
  }

  return frame;
};
