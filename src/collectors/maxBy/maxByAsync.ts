import {AnyToAsyncCollectorFunction} from '../../types';
import {isPromise} from '../../utils';
import {reduceAsync} from '../reduce/reduceAsync';

/** Return the largest value of all entries in the Iterable based on the comparer function */
export function maxByAsync<T>(
  comparer: (a: T, b: T) => number | PromiseLike<number>
): AnyToAsyncCollectorFunction<T, T | undefined> {
  return reduceAsync<T, T | undefined>(async (prev, curr) => {
    if (prev === undefined) {
      return curr;
    }
    const compareResult = comparer(prev, curr);
    return (isPromise(compareResult) ? await compareResult : compareResult) < 0
      ? curr
      : prev;
  }, undefined);
}
