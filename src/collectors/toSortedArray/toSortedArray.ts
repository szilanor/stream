import {AsyncCollectorFunction, CollectorFunction} from '../../types';
import {toArray, toArrayAsync} from '../toArray/toArray';

/** Creates an Array from an Iterable */
export function toSortedArray<T>(
  comparer: (a: T, b: T) => number,
  ascending = true
): CollectorFunction<T, T[]> {
  return stream => {
    const multiplier = ascending ? 1 : -1;
    return toArray<T>()(stream).sort((a, b) => multiplier * comparer(a, b));
  };
}

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
