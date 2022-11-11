import {CollectorFunction} from '../../types';
import {minBy} from '../minBy/minBy';

/** Return the smallest value of all entries in the Iterable */
export function min(): CollectorFunction<number, number | undefined> {
  return minBy((a, b) => a - b);
}
