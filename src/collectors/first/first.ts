import {CollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils/util-types';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function. */
export function first<T>(
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, T | undefined> {
  return source => {
    for (const entry of source) {
      if (predicate(entry)) {
        return entry;
      }
    }
    return undefined;
  };
}

export const find = first;
