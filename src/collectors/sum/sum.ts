import {CollectorFunction} from '../../types';
import {reduce} from '../reduce/reduce';

/** Return the sum of all entries in the Iterable */
export function sum(): CollectorFunction<number, number | undefined> {
  return reduce(
    (prev: number | undefined, curr: number) =>
      prev === undefined ? curr : prev + curr,
    undefined
  );
}
