import {CollectorFunction} from '../../types';
import {maxBy} from '../maxBy/maxBy';

/** Return the largest value of all entries in the Iterable */
export function max(): CollectorFunction<number, number | undefined> {
  return maxBy((a, b) => a - b);
}
