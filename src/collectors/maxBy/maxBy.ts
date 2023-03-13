import {CollectorFunction} from '../../types';
import {reduce} from '../reduce';
import {CompareFunction} from '../../utils';

/** Return the largest value of all entries in the Iterable based on the comparer function */
export function maxBy<T>(
  comparer: CompareFunction<T>
): CollectorFunction<T, T | undefined> {
  return reduce<T, T | undefined>(
    (prev, curr) =>
      prev === undefined || comparer(prev, curr) < 0 ? curr : prev,
    () => undefined
  );
}
