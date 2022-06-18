import {OperationFunction} from '../../types';

/** Returns an Iterable that yields array entries of the source Iterable transformed using the function */
export function arrayMap<T, O>(
  func: (entry: T, index: number, array: T[]) => O
): OperationFunction<T[], O[]> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        yield entry.map(func);
      }
    })();
}
