export function isPromise(promise) {
  console.log(promise, 'promise');
  return promise && typeof promise.then === 'function';
}

export function getPromise(condition) {
  return new Promise(function(resolve, reject) {
    if(condition) {
      resolve();
      return;
    }
    reject()
  })
}
