import {PredicateFunction} from '../../utils/util-types';
import {AsyncCollectorFunction} from '../../types';

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastAsync<T>(
  predicate: PredicateFunction<T> = () => true
): AsyncCollectorFunction<T, T | undefined> {
  return async source => {
    let last = undefined;
    for await (const entry of source) {
      if (predicate(entry)) {
        last = entry;
      }
    }
    return last;
  };
}

export const findLastAsync = lastAsync;
