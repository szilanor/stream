import {AnyToAsyncCollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns true if all entries satisfy the 'predicate' function. */
export function allAsync<T>(
  predicate: PredicateFunction<T>
): AnyToAsyncCollectorFunction<T, boolean> {
  return async source => {
    for await (const entry of source) {
      if (!predicate(entry)) {
        return false;
      }
    }
    return true;
  };
}

export const everyAsync = allAsync;
