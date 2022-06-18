import {OperationFunction} from '../../types';

/** Concatenates the Iterable with other Iterables in order */
export function concatWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return stream =>
    (function* () {
      for (const streamEntry of stream) {
        yield streamEntry;
      }
      for (const iterable of iterables) {
        for (const iterableEntry of iterable) {
          yield iterableEntry;
        }
      }
    })();
}
