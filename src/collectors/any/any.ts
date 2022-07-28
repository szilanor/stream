import {CollectorFunction} from '../../types';

/** Returns true if at least one of the entries satisfies the 'predicate' function. */
export function any<T>(
  predicate: (item: T, index: number) => boolean = () => true
): CollectorFunction<T, boolean> {
  return stream => {
    let index = -1;
    for (const entry of stream) {
      if (predicate(entry, ++index)) {
        return true;
      }
    }
    return false;
  };
}

export const some = any;
