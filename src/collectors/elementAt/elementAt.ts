import {CollectorFunction} from '../../types';

/** Returns the nth entry from the Iterable. */
export function elementAt<T>(
  index: number
): CollectorFunction<T, T | undefined> {
  return stream => {
    let i = 0;
    for (const entry of stream) {
      if (i === index) {
        return entry;
      }
      i++;
    }
    return undefined;
  };
}
