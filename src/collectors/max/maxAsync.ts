import {AnyToAsyncCollectorFunction} from '../../types';
import {maxByAsync} from '../maxBy/maxByAsync';

/** Return the largest value of all entries in the Iterable */
export function maxAsync(): AnyToAsyncCollectorFunction<
  number,
  number | undefined
> {
  return maxByAsync((a, b) => a - b);
}
