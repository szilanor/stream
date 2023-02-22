import {AsyncCollectorFunction} from '../../types';
import {maxByAsync} from '../maxBy';

/** Return the largest value of all entries in the Iterable */
export function maxAsync(): AsyncCollectorFunction<number, number | undefined> {
  return maxByAsync((a, b) => a - b);
}
