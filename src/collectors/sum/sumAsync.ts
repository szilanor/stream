import {AsyncCollectorFunction} from '../../types';
import {reduceAsync} from '../reduce';

/** Return the sum of all entries in the Iterable */
export function sumAsync(): AsyncCollectorFunction<number, number | undefined> {
  return reduceAsync(
    (prev: number | undefined, curr: number) =>
      prev === undefined ? curr : prev + curr,
    undefined
  );
}
