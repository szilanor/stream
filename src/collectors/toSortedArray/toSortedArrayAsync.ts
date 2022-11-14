import {AsyncCollectorFunction} from '../../types';
import {toArrayAsync} from '../toArray/toArrayAsync';

/** Creates an Array from an Iterable */
export function toSortedArrayAsync<T>(
  comparer: (a: T, b: T) => number,
  ascending = true
): AsyncCollectorFunction<T, T[]> {
  return async stream => {
    const multiplier = ascending ? 1 : -1;
    return (await toArrayAsync<T>()(stream)).sort(
      (a, b) => multiplier * comparer(a, b)
    );
  };
}
