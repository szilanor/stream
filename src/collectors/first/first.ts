import {CollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function. */
export function first<T>(
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, T | undefined> {
  return source => {
    let index = 0;
    for (const entry of source) {
      if (predicate(entry, index++)) {
        return entry;
      }
    }
    return undefined;
  };
}

export const find = first;
