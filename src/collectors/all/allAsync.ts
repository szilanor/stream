import {AnyToAsyncCollectorFunction} from '../../types';

/** Returns true if all entries satisfy the 'predicate' function. */
export function allAsync<T>(
  predicate: (item: T, index: number) => boolean | Promise<boolean>
): AnyToAsyncCollectorFunction<T, boolean> {
  return async stream => {
    let index = -1;
    for await (const entry of stream) {
      if (!(await predicate(entry, ++index))) {
        return false;
      }
    }
    return true;
  };
}

export const everyAsync = allAsync;
