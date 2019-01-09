import {SceneManager, findPixelKits} from './sdk';
import {createBlankFrame} from './frames';
import {HEIGHT, WIDTH} from './constants';

const oneDot = (x, y, color) => {
  const frame = createBlankFrame();
  frame[x][y] = color;

  return frame;
};

const main = async () => {
  const pixels = await findPixelKits();
  const sceneManager = pixels.map(pixel => new SceneManager(pixel));

  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      sceneManager.forEach(sm => {
        sm.pushFrame(oneDot(j, i, '#ff0000'));
      });
    }
  }
};
main();
