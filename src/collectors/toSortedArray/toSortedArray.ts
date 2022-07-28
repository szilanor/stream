import {CollectorFunction} from '../../types';

/** Creates an Array from an Iterable */
export function toSortedArray<T>(
  comparer: (a: T, b: T) => number,
  ascending = true
): CollectorFunction<T, T[]> {
  return stream =>
    Array.from(stream).sort((a, b) => (ascending ? 1 : -1) * comparer(a, b));
}
