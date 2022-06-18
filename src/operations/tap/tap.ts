import {OperationFunction} from '../../types';

/** Calls a callback function on each entry */
export function tap<T>(func: (item: T) => void): OperationFunction<T, T> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        func(entry);
        yield entry;
      }
    })();
}
