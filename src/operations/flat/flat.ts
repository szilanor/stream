import {OperationFunction} from '../../types';

/** Returns an Iterable that yields the inner entries of array entries of the source Iterable. */
export function flat<T>(): OperationFunction<T[], T> {
  return entries =>
    (function* () {
      for (const entryArrays of entries) {
        for (const entry of entryArrays) {
          yield entry;
        }
      }
    })();
}

export const flatten = flat;
