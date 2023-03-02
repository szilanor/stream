import {CollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns the index of the first entry from the Iterable that satisfy then 'predicate' function. */
export function firstIndex<T>(
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, number> {
  return source => {
    let index = 0;
    for (const entry of source) {
      if (predicate(entry, index)) {
        return index;
      }
      index++;
    }
    return -1;
  };
}

export const findIndex = firstIndex;
