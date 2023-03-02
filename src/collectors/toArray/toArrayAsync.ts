import {AsyncCollectorFunction} from '../../types';

/** Creates an Array from an Iterable */
export function toArrayAsync<T>(): AsyncCollectorFunction<T, T[]> {
  return async source => {
    const result = [];
    for await (const entry of source) {
      result.push(entry);
    }
    return result;
  };
}
