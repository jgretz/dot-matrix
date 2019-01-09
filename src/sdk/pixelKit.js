import SerialPort from 'serialport';
import hexToBase64Colors from './hexToBase64Colors';
import uuid from 'uuid';

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

  // helpers
  callbackAndPromise() {
    let resolve = null;
    let reject = null;

    const callback = err => {
      if (err) {
        console.error(err); // eslint-disable-line
        reject(err);
        return;
      }

      resolve();
    };

    const promise = new Promise((a, b) => {
      resolve = a;
      reject = b;
    });

    return {callback, promise};
  }

  // events
  subscribeToEvents() {
    this.port.on('close', this.indirectCallback());
  }

  // public interface
  async connect() {
    if (this.state.connected) {
      return;
    }

    const cap = this.callbackAndPromise();

    this.port.on('open', cap.callback);
    this.port.open();

    await cap.promise;

    this.state.connected = true;
  }

  async disconnect() {
    if (!this.state.connected) {
      return;
    }

    const cap = this.callbackAndPromise();

    this.port.on('close', cap.callback);
    this.port.close();

    await cap.promise;

    this.state.connected = false;
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
    const cap = this.callbackAndPromise();

    this.port.write(Buffer.from(packet), cap.callback);

    await cap.promise;

    return true;
  }
}
