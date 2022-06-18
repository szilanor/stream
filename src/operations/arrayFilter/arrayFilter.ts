import {OperationFunction} from '../../types';

/** Returns an Iterable that yields only array entries of the source Iterable that satisfy the function. */
export function arrayFilter<T>(
  func: (entry: T, index: number, array: T[]) => boolean
): OperationFunction<T[], T[]> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        yield entry.filter(func);
      }
    })();
}
