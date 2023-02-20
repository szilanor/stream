import {AnyToAsyncCollectorFunction} from '../../types';
import {reduceAsync} from '../reduce';
import {isPromise} from '../../utils';

/** Return the smallest value of all entries in the Iterable based on the comparer function */
export function minByAsync<T>(
  comparer: (a: T, b: T) => number | PromiseLike<number>
): AnyToAsyncCollectorFunction<T, T | undefined> {
  return reduceAsync<T, T | undefined>(async (prev, curr) => {
    if (prev === undefined) {
      return curr;
    }
    const compareResult = comparer(prev, curr);
    return (isPromise(compareResult) ? await compareResult : compareResult) > 0
      ? curr
      : prev;
  }, undefined);
}
