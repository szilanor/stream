import {OperationFunction} from '../../types';

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofType<T, TOfType extends T>(
  func: (item: T) => item is TOfType
): OperationFunction<T, TOfType> {
  return entries =>
    (function* () {
      for (const entry of entries) {
        if (func(entry)) {
          yield entry;
        }
      }
    })();
}
