import {CollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns true if at least one of the entries satisfies the 'predicate' function. */
export function any<T>(
  predicate: PredicateFunction<T> = () => true
): CollectorFunction<T, boolean> {
  return source => {
    for (const entry of source) {
      if (predicate(entry)) {
        return true;
      }
    }
    return false;
  };
}

export const some = any;
