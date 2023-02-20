import {CollectorFunction} from '../../types';
import {toArray} from '../toArray';

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
