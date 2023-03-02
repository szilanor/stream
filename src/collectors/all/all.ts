import {CollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns true if all entries satisfy the 'predicate' function. */
export function all<T>(
  predicate: PredicateFunction<T>
): CollectorFunction<T, boolean> {
  return source => {
    let index = 0;
    for (const entry of source) {
      if (!predicate(entry, index++)) {
        return false;
      }
    }
    return true;
  };
}

export const every = all;
