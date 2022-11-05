import {AsyncCollectorFunction, CollectorFunction} from '../../types';
import {reduce, reduceAsync} from '../reduce/reduce';

/** Return the smallest value of all entries in the Iterable based on the comparer function */
export function minBy<T>(
  comparer: (a: T, b: T) => number
): CollectorFunction<T, T | undefined> {
  return reduce<T, T | undefined>(
    (prev, curr) =>
      prev === undefined || comparer(prev, curr) > 0 ? curr : prev,
    undefined
  );
}

export function minByAsync<T>(
  comparer: (a: T, b: T) => number
): AsyncCollectorFunction<T, T | undefined> {
  return reduceAsync<T, T | undefined>(
    (prev, curr) =>
      prev === undefined || comparer(prev, curr) > 0 ? curr : prev,
    undefined
  );
}
