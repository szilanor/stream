import {CollectorFunction} from '../../types';

/** Returns true if all entries satisfy the 'predicate' function. */
export function all<T>(
  predicate: (item: T, index: number) => boolean
): CollectorFunction<T, boolean> {
  return stream => {
    let index = -1;
    for (const entry of stream) {
      if (!predicate(entry, ++index)) {
        return false;
      }
    }
    return true;
  };
}

export const every = all;
