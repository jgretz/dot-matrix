/* eslint-disable no-plusplus */
import {Scene, Flag} from '../types';

const mapFor = (height: number, width: number): Flag[][] => {
  const map: Flag[][] = [];

  // create
  for (let y = 0; y < height; y++) {
    const row: Flag[] = [];
    for (let x = 0; x < width; x++) {
      row[x] = 0;
    }
    map.push(row);
  }

  return map;
};

export default (scene: Scene, height: number, width: number): Flag[][] => {
  const map = mapFor(height, width);

  // map
  scene.tiles.forEach(({point, item}) => {
    item.matrix.forEach((itemRow, itemY) => {
      itemRow.forEach((flag, itemX) => {
        if (!flag) {
          return;
        }

        const x = point.x + itemX;
        const y = point.y + itemY;

        if (x >= width || y >= height) {
          return;
        }

        if (!map[y][x]) {
          map[y][x] = flag;
        }
      });
    });
  });

  // return
  return map;
};
