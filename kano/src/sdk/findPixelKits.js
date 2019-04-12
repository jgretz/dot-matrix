import SerialPort from 'serialport';
import PixelKit from './pixelKit';

const RPK_VENDOR_ID = '0403';
const RPK_PRODUCT_ID = '6015';

export default async () => {
  // find the devices and wrap them in our controller
  const serialPorts = await SerialPort.list();
  const pixelPorts = serialPorts.filter(
    port =>
      port.vendorId === RPK_VENDOR_ID && port.productId === RPK_PRODUCT_ID,
  );
  const pixels = pixelPorts.map(port => new PixelKit({port: port.comName}));

  // await connections
  await Promise.all(pixels.map(p => p.connect()));

  return pixels;
};
