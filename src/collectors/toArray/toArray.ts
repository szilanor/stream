import {AsyncCollectorFunction, CollectorFunction} from '../../types';

/** Creates an Array from an Iterable */
export function toArray<T>(): CollectorFunction<T, T[]> {
  return stream => Array.from(stream);
}

export function toArrayAsync<T>(): AsyncCollectorFunction<T, T[]> {
  return async stream => {
    const result = [];
    for await (const entry of stream) {
      result.push(entry);
    }
    return result;
  };
}
