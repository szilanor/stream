import {CollectorFunction} from '../../types';

/** Returns true if the Iterable has 0 entry. */
export function isEmpty<T>(): CollectorFunction<T, boolean> {
  return stream => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of stream) {
      return false;
    }
    return true;
  };
}
