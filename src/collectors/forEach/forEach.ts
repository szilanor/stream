import {CollectorFunction} from '../../types';

/** Call a callback function on every entry. */
export function forEach<T>(
  callback: (item: T) => void
): CollectorFunction<T, void> {
  return source => {
    for (const entry of source) {
      callback(entry);
    }
  };
}
