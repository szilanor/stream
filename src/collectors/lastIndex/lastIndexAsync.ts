import {PredicateFunction} from '../../utils';
import {AsyncCollectorFunction} from '../../types';

/** Returns the index of the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastIndexAsync<T>(
  predicate: PredicateFunction<T> = () => true
): AsyncCollectorFunction<T, number> {
  return async source => {
    let index = -1;
    let lastIndex = index;
    for await (const entry of source) {
      index++;
      if (predicate(entry)) {
        lastIndex = index;
      }
    }
    return lastIndex;
  };
}

export const findLastIndexAsync = lastIndexAsync;
