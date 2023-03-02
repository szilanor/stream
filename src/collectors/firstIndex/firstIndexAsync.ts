import {AnyToAsyncCollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils/util-types';

/** Returns the index of the first entry from the Iterable that satisfy then 'predicate' function. */
export function firstIndexAsync<T>(
  predicate: PredicateFunction<T> = () => true
): AnyToAsyncCollectorFunction<T, number> {
  return async source => {
    let index = 0;
    for await (const entry of source) {
      if (predicate(entry)) {
        return index;
      }
      index++;
    }
    return -1;
  };
}

export const findIndexAsync = firstIndexAsync;
