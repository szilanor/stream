import {OperationFunction} from '../../types';

/** Returns an Iterable started with the value parameter then the entries of the source Iterable. */
export function startWith<T>(value: T): OperationFunction<T, T> {
  return entries =>
    (function* () {
      yield value;
      for (const entry of entries) {
        yield entry;
      }
    })();
}
