import {CollectorFunction} from '../../types';
import {maxBy} from '../maxBy';
import {CompareFunction} from '../../utils/util-types';

/** Return the smallest value of all entries in the Iterable based on the comparer function */
export function minBy<T>(
  comparer: CompareFunction<T>
): CollectorFunction<T, T | undefined> {
  return maxBy((a, b) => -1 * comparer(a, b));
}
