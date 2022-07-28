import {CollectorFunction} from '../../types';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function. */
export function first<T>(
  predicate: (item: T) => boolean = () => true
): CollectorFunction<T, T | undefined> {
  return stream => {
    for (const entry of stream) {
      if (predicate(entry)) {
        return entry;
      }
    }
    return undefined;
  };
}

export const find = first;
