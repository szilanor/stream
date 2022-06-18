import {CollectorFunction} from '../../types';

/** Returns the index of the first entry from the Iterable that satisfy then 'predicate' function. */
export function firstIndex<T>(
  predicate: (item: T) => boolean = () => true
): CollectorFunction<T, number> {
  return stream => {
    let index = 0;
    for (const entry of stream) {
      if (predicate(entry)) {
        return index;
      }
      index++;
    }
    return -1;
  };
}
