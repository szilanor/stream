import {OperationFunction} from '../../types';

/** Returns an Iterable taking entries of the source Iterable while the parameter function returns true. */
export function takeWhile<T>(
  func: (entry: T) => boolean
): OperationFunction<T, T> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        if (!func(entry)) break;
        yield entry;
      }
    })();
}
