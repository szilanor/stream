import {AsyncCollectorFunction} from '../../types';

/** Returns the number of entries in the Iterable. */
export function countAsync<T>(): AsyncCollectorFunction<T, number> {
  return async stream => {
    let counter = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of stream) {
      counter++;
    }
    return counter;
  };
}

export const lengthAsync = countAsync;
