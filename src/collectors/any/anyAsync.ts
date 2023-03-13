import {AnyToAsyncCollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns true if at least one of the entries satisfies the 'predicate' function. */
export function anyAsync<T>(
  predicate: PredicateFunction<T> = () => true
): AnyToAsyncCollectorFunction<T, boolean> {
  return async source => {
    let index = 0;
    for await (const entry of source) {
      if (predicate(entry, index++)) {
        return true;
      }
    }
    return false;
  };
}

export const someAsync = anyAsync;
