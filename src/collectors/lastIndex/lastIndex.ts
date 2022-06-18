import {CollectorFunction} from '../../types';

/** Returns the index of the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastIndex<T>(
  predicate: (item: T) => boolean = () => true
): CollectorFunction<T, number> {
  return stream => {
    let index = -1;
    let lastIndex = index;
    for (const entry of stream) {
      index++;
      if (predicate(entry)) {
        lastIndex = index;
      }
    }
    return lastIndex;
  };
}
