import {AsyncCollectorFunction} from '../../types';
import {MaybeAsyncCallbackFunction} from '../../utils';

/** Call a callback function on every entry. */
export function forEachAsync<T>(
  callback: MaybeAsyncCallbackFunction<T>
): AsyncCollectorFunction<T, void> {
  return async source => {
    let index = 0;
    for await (const entry of source) {
      await callback(entry, index++);
    }
  };
}
