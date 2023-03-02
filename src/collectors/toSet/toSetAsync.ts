import {AsyncCollectorFunction} from '../../types';

/** Creates a Set from an Iterable */
export function toSetAsync<T>(): AsyncCollectorFunction<T, Set<T>> {
  return async source => {
    const result = new Set<T>();
    for await (const entry of source) {
      result.add(entry);
    }
    return result;
  };
}
