/* eslint-disable @typescript-eslint/no-explicit-any */
export function isFunction(x: unknown): x is Function {
  return typeof x === 'function';
}

export function isIterable<T>(
  x: Iterable<T> | AsyncIterable<T>
): x is Iterable<T> {
  return (
    x !== null && x !== undefined && isFunction((x as any)[Symbol.iterator])
  );
}

export function isAsyncIterable<T>(
  x: Iterable<T> | AsyncIterable<T>
): x is AsyncIterable<T> {
  return (
    x !== null &&
    x !== undefined &&
    isFunction((x as any)[Symbol.asyncIterator])
  );
}

export function isPromise<T>(x: T | PromiseLike<T>): x is PromiseLike<any> {
  return isFunction((x as any)?.then);
}
