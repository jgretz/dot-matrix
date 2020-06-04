import {Font} from '../types';

import * as lowercase from './lowercase';
import * as uppercase from './uppercase';
import numbers from './numbers';
import symbols from './symbols';

export default {
  name: 'Alfred Basic',

  width: 4,
  spacing: 1,

  characters: {
    ...lowercase,
    ...uppercase,
    ...numbers,
    ...symbols,
  },

  notFound: symbols.notFound,
} as Font;
