import {AsyncCollectorFunction} from '../../types';
import {maxByAsync} from '../maxBy';
import {CompareFunction} from '../../utils';

/** Return the smallest value of all entries in the Iterable based on the comparer function */
export function minByAsync<T>(
  comparer: CompareFunction<T>
): AsyncCollectorFunction<T, T | undefined> {
  return maxByAsync((a, b) => -1 * comparer(a, b));
}
