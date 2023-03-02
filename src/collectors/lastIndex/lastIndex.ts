import {CollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns the index of the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastIndex<T>(
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, number> {
  return source => {
    let index = -1;
    let lastIndex = index;
    for (const entry of source) {
      index++;
      if (predicate(entry, index)) {
        lastIndex = index;
      }
    }
    return lastIndex;
  };
}

export const findLastIndex = lastIndex;
