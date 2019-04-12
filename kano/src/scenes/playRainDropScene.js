import {createBlankFrame} from '../util';
import {HEIGHT, WIDTH, REFRESH_RATE} from '../constants';

const COLORS = ['#ff0000', '#00ff00', '#0000ff'];

const oneDot = (x, y, color) => {
  const frame = createBlankFrame();
  frame[x][y] = color;

  return frame;
};

const rainDropScene = sceneManager => {
  let index = 0;

  for (let j = 0; j < WIDTH; j++) {
    for (let i = 0; i < HEIGHT; i++) {
      const frame = oneDot(j, i, COLORS[index % COLORS.length]);
      index++;

      sceneManager.forEach(sm => {
        sm.pushFrame(frame);
      });
    }
  }
};

export default sceneManager => {
  rainDropScene(sceneManager);
  setInterval(() => {
    rainDropScene(sceneManager);
  }, HEIGHT * WIDTH * REFRESH_RATE);
};
