import {AsyncCollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function. */
export function firstAsync<T>(
  predicate: PredicateFunction<T> = () => true
): AsyncCollectorFunction<T, T | undefined> {
  return async source => {
    let index = 0;
    for await (const entry of source) {
      if (predicate(entry, index++)) {
        return entry;
      }
    }
    return undefined;
  };
}

export const findAsync = firstAsync;
