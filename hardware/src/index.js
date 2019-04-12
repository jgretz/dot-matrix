import {findPixelKits} from './sdk';
import {SceneManager} from './util';

import {playTextScene} from './scenes';

const main = async () => {
  const pixels = await findPixelKits();
  const sceneManager = pixels.map(pixel => new SceneManager(pixel));

  playTextScene(sceneManager, 'Hello World');
};
main();
