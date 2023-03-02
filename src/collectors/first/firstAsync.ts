import {AnyToAsyncCollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function. */
export function firstAsync<T>(
  predicate: PredicateFunction<T> = () => true
): AnyToAsyncCollectorFunction<T, T | undefined> {
  return async source => {
    for await (const entry of source) {
      if (predicate(entry)) {
        return entry;
      }
    }
    return undefined;
  };
}

export const findAsync = firstAsync;
