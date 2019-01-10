const execute = async action => {
  // glue
  let resolve = null;
  let reject = null;

  const promise = new Promise((a, b) => {
    resolve = a;
    reject = b;
  });

  const cb = err => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  };

  // execute
  action(cb);

  // return
  return promise;
};

export const executeIndirect = async (port, event) => {
  execute(cb => {
    port.on(event, cb);
    port[event]();
  });
};

export const executeDirect = async (port, event, params) => {
  execute(cb => {
    port[event](params, cb);
  });
};
