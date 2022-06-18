import {OperationFunction} from '../../types';

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinct<T>(): OperationFunction<T, T> {
  return entries =>
    (function* () {
      const set = new Set<T>();
      for (const entry of entries) {
        if (!set.has(entry)) {
          set.add(entry);
          yield entry;
        }
      }
      set.clear();
    })();
}
