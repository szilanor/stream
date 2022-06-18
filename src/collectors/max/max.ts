import {CollectorFunction} from '../../types';
import {reduce} from '../reduce/reduce';

/** Return the largest value of all entries in the Iterable */
export function max(): CollectorFunction<number, number | undefined> {
  return reduce<number, number | undefined>(
    (prev, curr) => (prev === undefined || prev < curr ? curr : prev),
    undefined
  );
}
