import {AnyToAsyncCollectorFunction} from '../../types';

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastAsync<T>(
  predicate: (item: T) => boolean | Promise<boolean> = () => true
): AnyToAsyncCollectorFunction<T, T | undefined> {
  return async stream => {
    let last = undefined;
    for await (const entry of stream) {
      if (await predicate(entry)) {
        last = entry;
      }
    }
    return last;
  };
}

export const findLastAsync = lastAsync;
