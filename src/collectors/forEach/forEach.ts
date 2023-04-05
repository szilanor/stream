import {CollectorFunction} from '../../types';
import {CallbackFunction} from '../../utils';

/** Call a callback function on every entry. */
export function forEach<T>(
  callback: CallbackFunction<T>
): CollectorFunction<T, void> {
  return source => {
    let index = 0;
    for (const entry of source) {
      callback(entry, index++);
    }
  };
}
