import {OperationFunction} from '../../types';

/** Returns an Iterable with the entries of the source Iterable then the parameter value. */
export function endWith<T>(value: T): OperationFunction<T, T> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        yield entry;
      }
      yield value;
    })();
}
