import {AnyToAsyncCollectorFunction} from '../../types';

/** Returns the index of the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastIndexAsync<T>(
  predicate: (item: T) => boolean | Promise<boolean> = () => true
): AnyToAsyncCollectorFunction<T, number> {
  return async stream => {
    let index = -1;
    let lastIndex = index;
    for await (const entry of stream) {
      index++;
      if (await predicate(entry)) {
        lastIndex = index;
      }
    }
    return lastIndex;
  };
}

export const findLastIndexAsync = lastIndexAsync;
