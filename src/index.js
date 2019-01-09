import {initializePixel, pushFrame} from './pixel';
import {createBlankFrame} from './frames';
import {HEIGHT, WIDTH} from './constants';

const oneDot = (x, y, color) => {
  const frame = createBlankFrame();
  frame[x][y] = color;

  return frame;
};

const main = async () => {
  await initializePixel();

  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      pushFrame(oneDot(j, i, '#ff0000'));
    }
  }
};
main();
