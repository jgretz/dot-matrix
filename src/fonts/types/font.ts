import {Character} from './character';

export type Font = {
  name: string;

  width: number;
  spacing: number;

  characters: {[key: string]: Character};
  notFound: Character;
};
