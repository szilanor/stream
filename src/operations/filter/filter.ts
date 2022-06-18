import {OperationFunction} from '../../types';

/** Returns an Iterable that yields only entries of the source Iterable that satisfy the function. */
export function filter<T>(
  func: (value: T, index: number) => boolean
): OperationFunction<T, T> {
  return entries =>
    (function* () {
      let index = 0;
      for (const entry of entries) {
        if (func(entry, index++)) {
          yield entry;
        }
      }
    })();
}
