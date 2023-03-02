import {AnyToAsyncCollectorFunction} from '../../types';

/** Call a callback function on every entry. */
export function forEachAsync<T>(
  callback: (item: T) => void | Promise<void>
): AnyToAsyncCollectorFunction<T, void> {
  return async source => {
    for await (const entry of source) {
      await callback(entry);
    }
  };
}
