import {OperationFunction} from '../../types';

/** Returns an Iterable skipping the given amount of entries of the source Iterable. */
export function skip<T>(count: number): OperationFunction<T, T> {
  return entries =>
    (function* () {
      let i = 0;
      for (const entry of entries) {
        if (++i <= count) continue;
        yield entry;
      }
    })();
}
