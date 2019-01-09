import _ from 'lodash';
import findPixelKits from '../sdk/findPixelKits';

export default async () => {
  const devices = await findPixelKits();
  const pixel = _.head(devices);

  if (!pixel) {
    console.warn('Unable to find a pixel either through usb or on wifi'); // eslint-disable-line
  }

  return pixel;
};
