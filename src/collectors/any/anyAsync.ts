import {AnyToAsyncCollectorFunction} from '../../types';

/** Returns true if at least one of the entries satisfies the 'predicate' function. */
export function anyAsync<T>(
  predicate: (item: T, index: number) => boolean | Promise<boolean> = () => true
): AnyToAsyncCollectorFunction<T, boolean> {
  return async stream => {
    let index = -1;
    for await (const entry of stream) {
      if (await predicate(entry, ++index)) {
        return true;
      }
    }
    return false;
  };
}

export const someAsync = anyAsync;
