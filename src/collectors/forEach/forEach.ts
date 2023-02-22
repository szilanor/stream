import {CollectorFunction} from '../../types';

/** Call a callback function on every entry. */
export function forEach<T>(
  callback: (item: T) => void
): CollectorFunction<T, void> {
  return stream => {
    for (const entry of stream) {
      callback(entry);
    }
  };
}
