import SerialPort from 'serialport';
import uuid from 'uuid';
import hexToBase64Colors from './hexToBase64Colors';
import {executeDirect, executeIndirect} from './executeOnPort';

export default class PixelKit {
  constructor({port}) {
    if (!port) {
      throw new Error('You must specify a port.');
    }

    this.port = new SerialPort(port, {
      baudRate: 115200,
      autoOpen: false,
    });

    this.state = {
      connected: false,
    };
  }

  // public interface
  async connect() {
    if (this.state.connected) {
      return;
    }

    try {
      await executeIndirect(this.port, 'open');

      this.state.connected = true;
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  }

  async disconnect() {
    if (!this.state.connected) {
      return;
    }

    try {
      await executeIndirect(this.port, 'close');

      this.state.connected = false;
    } catch (err) {
      console.error(err); // eslint-disable-line
    }
  }

  async streamFrame(frame) {
    if (!this.state.connected) {
      return false;
    }

    // build the request
    const rpcObject = {
      type: 'rpc-request',
      id: uuid.v4(),
      method: 'lightboard:on',
      params: [{map: hexToBase64Colors(frame)}],
    };
    const packet = `${JSON.stringify(rpcObject)}\r\n`;

    // make the request and wait for it to finish
    try {
      await executeDirect(this.port, 'write', Buffer.from(packet));

      return true;
    } catch (err) {
      console.error(err); // eslint-disable-line

      return false;
    }
  }
}
