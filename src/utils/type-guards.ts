/* eslint-disable @typescript-eslint/no-explicit-any */
export function isFunction(x: any): x is Function {
  return typeof x === 'function';
}

export function isIterable(x: any): x is Iterable<any> {
  return x !== null && x !== undefined && isFunction(x[Symbol.iterator]);
}

export function isAsyncIterable(x: any): x is AsyncIterable<any> {
  return x !== null && x !== undefined && isFunction(x[Symbol.asyncIterator]);
}

export function isPromise(x: any): x is PromiseLike<any> {
  return isFunction(x?.then);
}
