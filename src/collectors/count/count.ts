import {CollectorFunction} from '../../types';

/** Returns the number of entries in the Iterable. */
export function count<T>(): CollectorFunction<T, number> {
  return source => {
    let counter = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of source) {
      counter++;
    }
    return counter;
  };
}

export const length = count;
