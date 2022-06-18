import {OperationFunction} from '../../types';

/** Returns an Iterable skipping entries of the source Iterable while the parameter function returns true. */
export function skipWhile<T>(
  func: (entry: T) => boolean
): OperationFunction<T, T> {
  return entries =>
    (function* () {
      let skip = true;
      for (const entry of entries) {
        if (skip && (skip = func(entry))) continue;
        yield entry;
      }
    })();
}
