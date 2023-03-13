import {CollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function last<T>(
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, T | undefined> {
  return source => {
    let last = undefined;
    let index = 0;
    for (const entry of source) {
      if (predicate(entry, index++)) {
        last = entry;
      }
    }
    return last;
  };
}

export const findLast = last;
