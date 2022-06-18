import {CollectorFunction} from '../../types';

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function last<T>(
  predicate: (item: T) => boolean = () => true
): CollectorFunction<T, T | undefined> {
  return stream => {
    let last = undefined;
    for (const entry of stream) {
      if (predicate(entry)) {
        last = entry;
      }
    }
    return last;
  };
}
