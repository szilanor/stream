import {AsyncCollectorFunction} from '../../types';
import {minByAsync} from '../minBy';

/** Return the smallest value of all entries in the Iterable */
export function minAsync(): AsyncCollectorFunction<number, number | undefined> {
  return minByAsync((a, b) => a - b);
}
