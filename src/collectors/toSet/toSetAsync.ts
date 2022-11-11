import {AsyncCollectorFunction} from '../../types';

/** Creates a Set from an Iterable */
export function toSetAsync<T>(): AsyncCollectorFunction<T, Set<T>> {
  return async stream => {
    const result = new Set<T>();
    for await (const entry of stream) {
      result.add(entry);
    }
    return result;
  };
}
