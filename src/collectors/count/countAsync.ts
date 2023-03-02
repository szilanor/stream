import {AsyncCollectorFunction} from '../../types';

/** Returns the number of entries in the Iterable. */
export function countAsync<T>(): AsyncCollectorFunction<T, number> {
  return async source => {
    let counter = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of source) {
      counter++;
    }
    return counter;
  };
}

export const lengthAsync = countAsync;
