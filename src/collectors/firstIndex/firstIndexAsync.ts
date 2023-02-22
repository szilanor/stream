import {AnyToAsyncCollectorFunction} from '../../types';

/** Returns the index of the first entry from the Iterable that satisfy then 'predicate' function. */
export function firstIndexAsync<T>(
  predicate: (item: T) => boolean | Promise<boolean> = () => true
): AnyToAsyncCollectorFunction<T, number> {
  return async stream => {
    let index = 0;
    for await (const entry of stream) {
      if (await predicate(entry)) {
        return index;
      }
      index++;
    }
    return -1;
  };
}

export const findIndexAsync = firstIndexAsync;
