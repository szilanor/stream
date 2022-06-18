import {OperationFunction} from '../../types';

/** Returns an Iterable that yields only entries of the source Iterable with truthy value. */
export function truthy<T>(): OperationFunction<T, T> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        if (entry) {
          yield entry;
        }
      }
    })();
}
