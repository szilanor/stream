import {AsyncCollectorFunction} from '../../types';
import {reduceAsync} from '../reduce';
import {CompareFunction} from '../../utils/util-types';

/** Return the largest value of all entries in the Iterable based on the comparer function */
export function maxByAsync<T>(
  comparer: CompareFunction<T>
): AsyncCollectorFunction<T, T | undefined> {
  return reduceAsync<T, T | undefined>(async (prev, curr) => {
    if (prev === undefined) {
      return curr;
    }
    return comparer(prev, curr) < 0 ? curr : prev;
  }, undefined);
}
