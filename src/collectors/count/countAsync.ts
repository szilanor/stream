import {AsyncCollectorFunction} from '../../types';
import {PredicateFunction} from '../../utils';

/** Returns the number of entries in the Iterable. */
export function countAsync<T>(
  predicateFunction: PredicateFunction<T> = () => true
): AsyncCollectorFunction<T, number> {
  return async source => {
    let counter = 0;
    let index = 0;
    for await (const entry of source) {
      if (predicateFunction(entry, index++)) {
        counter++;
      }
    }
    return counter;
  };
}

export const lengthAsync = countAsync;
