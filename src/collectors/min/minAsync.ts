import {AnyToAsyncCollectorFunction} from '../../types';
import {minByAsync} from '../minBy/minByAsync';

/** Return the smallest value of all entries in the Iterable */
export function minAsync(): AnyToAsyncCollectorFunction<
  number,
  number | undefined
> {
  return minByAsync((a, b) => a - b);
}
