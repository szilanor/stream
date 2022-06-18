import {OperationFunction} from '../../types';

/** Returns an Iterable that yields the current and the previous entry of the source Iterable. */
export function pairwise<T>(): OperationFunction<T, [T, T]> {
  return entries =>
    (function* () {
      let prev: T | undefined;
      for (const entry of entries) {
        if (prev) {
          yield [prev, entry] as [T, T];
        }
        prev = entry;
      }
    })();
}
