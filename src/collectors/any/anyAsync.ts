import {AnyToAsyncCollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils/util-types';

/** Returns true if at least one of the entries satisfies the 'predicate' function. */
export function anyAsync<T>(
  predicate: PredicateFunction<T> = () => true
): AnyToAsyncCollectorFunction<T, boolean> {
  return async source => {
    for await (const entry of source) {
      if (predicate(entry)) {
        return true;
      }
    }
    return false;
  };
}

export const someAsync = anyAsync;
