import {OperationFunction} from '../../types';

/** Returns an Iterable taking the given amount of entries of the source Iterable. */
export function take<T>(count: number): OperationFunction<T, T> {
  return entries =>
    (function* () {
      let i = 0;
      if (count > 0)
        for (const entry of entries) {
          yield entry;
          if (++i >= count) break;
        }
    })();
}
