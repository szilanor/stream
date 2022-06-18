import {CollectorFunction} from '../../types';
import {reduce} from '../reduce/reduce';

/** Return the smallest value of all entries in the Iterable */
export function min(): CollectorFunction<number, number | undefined> {
  return reduce<number, number | undefined>(
    (prev, curr) => (prev === undefined || prev > curr ? curr : prev),
    undefined
  );
}
