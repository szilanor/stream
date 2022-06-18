import {OperationFunction} from '../../types';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNull<T>(): OperationFunction<T, T> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        if (entry !== null && entry !== undefined) {
          yield entry;
        }
      }
    })();
}
