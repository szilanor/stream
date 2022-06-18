import {CollectorFunction} from '../../types';
import {reduce} from '../reduce/reduce';

/** Return the sum of all entries in the Iterable */
export function sum(): CollectorFunction<number, number | undefined> {
  return reduce<number, number | undefined>(
    (prev, curr) => (prev === undefined ? curr : prev + curr),
    undefined
  );
}
