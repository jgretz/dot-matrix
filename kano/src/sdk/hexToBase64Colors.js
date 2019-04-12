/* eslint-disable */

export default element => {
  const frameBuffer = Buffer.alloc(element.length * 2, 0);

  element.forEach((color, index) => {
    let colorBin = Buffer.alloc(2);
    let rgb888 = null;
    let rgb565 = null;

    if (
      typeof color === 'string' &&
      color.length === 7 &&
      /#[0-9a-f]{6}/i.test(color)
    ) {
      rgb888 = parseInt(color.substring(1, 7), 16);
      //                blue                 green                  red
      rgb565 =
        ((rgb888 & 0xf8) >> 3) |
        ((rgb888 & 0xfc00) >> 5) |
        ((rgb888 & 0xf80000) >> 8);

      colorBin.writeUInt16BE(rgb565, 0);
    } else {
      // If the color is invalid, write black
      colorBin.writeUInt16BE(0x0000, 0);
    }

    colorBin.copy(frameBuffer, index * 2);
  });

  return frameBuffer.toString('base64');
};
