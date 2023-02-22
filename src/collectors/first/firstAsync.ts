import {AnyToAsyncCollectorFunction} from '../../types';

/** Returns the first entry from the Iterable that satisfy then 'predicate' function. */
export function firstAsync<T>(
  predicate: (item: T) => boolean | Promise<boolean> = () => true
): AnyToAsyncCollectorFunction<T, T | undefined> {
  return async stream => {
    for await (const entry of stream) {
      if (await predicate(entry)) {
        return entry;
      }
    }
    return undefined;
  };
}

export const findAsync = firstAsync;
