import {OperationFunction} from '../../types';

/** Returns an Iterable with the value parameter if the source Iterable is empty. */
export function defaultIfEmpty<T>(value: T): OperationFunction<T, T> {
  return entries =>
    (function* () {
      let hasValue = false;
      for (const entry of entries) {
        hasValue = true;
        yield entry;
      }
      if (!hasValue) {
        yield value;
      }
    })();
}
