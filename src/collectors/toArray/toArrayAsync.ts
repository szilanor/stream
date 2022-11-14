import {AsyncCollectorFunction} from '../../types';

/** Creates an Array from an Iterable */
export function toArrayAsync<T>(): AsyncCollectorFunction<T, T[]> {
  return async iterable => {
    const result = [];
    for await (const entry of iterable) {
      result.push(entry);
    }
    return result;
  };
}
