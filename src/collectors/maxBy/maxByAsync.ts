import {AsyncCollectorFunction} from '../../types';
import {reduceAsync} from '../reduce';

/** Return the largest value of all entries in the Iterable based on the comparer function */
export function maxByAsync<T>(
  comparer: (a: T, b: T) => number
): AsyncCollectorFunction<T, T | undefined> {
  return reduceAsync<T, T | undefined>(async (prev, curr) => {
    if (prev === undefined) {
      return curr;
    }
    return comparer(prev, curr) < 0 ? curr : prev;
  }, undefined);
}
