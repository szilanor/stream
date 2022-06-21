import {CollectorFunction} from '../../types';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function or the 'defaultValue'. */
export function firstOrDefault<T>(
  defaultValue: T,
  predicate: (item: T) => boolean = () => true
): CollectorFunction<T, T> {
  return stream => {
    for (const entry of stream) {
      if (predicate(entry)) {
        return entry;
      }
    }
    return defaultValue;
  };
}
