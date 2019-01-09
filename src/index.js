import {SceneManager, findPixelKits} from './sdk';
import playRainDropScene from './scenes/raindropScene';

const main = async () => {
  const pixels = await findPixelKits();
  const sceneManager = pixels.map(pixel => new SceneManager(pixel));

  playRainDropScene(sceneManager);
};
main();
