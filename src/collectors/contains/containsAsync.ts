import {AsyncCollectorFunction} from '../../types';

/** Returns if at least one of the entries equals with the given 'value'. */
export function containsAsync<T>(
  value: T,
  compareFunction: (a: T, b: T) => boolean = (a, b) => a === b
): AsyncCollectorFunction<T, boolean> {
  return async stream => {
    for await (const entry of stream) {
      if (compareFunction(entry, value)) {
        return true;
      }
    }
    return false;
  };
}

export const includesAsync = containsAsync;
