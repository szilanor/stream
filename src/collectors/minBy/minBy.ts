import {CollectorFunction} from '../../types';
import {maxBy} from '../maxBy';

/** Return the smallest value of all entries in the Iterable based on the comparer function */
export function minBy<T>(
  comparer: (a: T, b: T) => number
): CollectorFunction<T, T | undefined> {
  return maxBy((a, b) => -1 * comparer(a, b));
}
