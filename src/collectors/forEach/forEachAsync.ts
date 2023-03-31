import {AsyncCollectorFunction} from '../../types';
import {MaybeAsyncFunction} from '../../utils';

/** Call a callback function on every entry. */
export function forEachAsync<T>(
  callback: (item: T) => MaybeAsyncFunction<void>
): AsyncCollectorFunction<T, void> {
  return async source => {
    for await (const entry of source) {
      await callback(entry);
    }
  };
}