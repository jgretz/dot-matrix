import {BasicFont, Font, Character} from '../../fonts';
import {Item, Tile, Scene, Point} from '../types';

const characterToItem = (character: Character, font: Font): Item => ({
  ...character,
  width: font.width,
});

export class Text implements Scene {
  public tiles: Tile[];

  constructor(public text: string, public position: Point = {x: 0, y: 0}, public font = BasicFont) {
    this.tiles = text.split('').map((c, index) => {
      const character = font.characters[c];

      const item = characterToItem(character || font.notFound, font);

      const point = {
        x: position.x + (font.width + font.spacing) * index,
        y: position.y,
      };

      return {point, item} as Tile;
    });
  }
}
