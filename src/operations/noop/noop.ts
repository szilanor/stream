import {OperationFunction} from '../../types';

/** Simply returns every entry from the source Iterable */
export function noop<T>(): OperationFunction<T, T> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        yield entry;
      }
    })();
}
