import type { CollectorFunction, PredicateFunction } from "~/types";
import { reduce } from "./reduce";

/**
 * Returns a collector that partitions the source into two arrays based on a predicate.
 * @param predicate Predicate function to determine which array an element should be added to.
 * @typeParam T Type of items in the source.
 * @returns Collector that partitions the source into two arrays based on a predicate.
 *
 * @example
 * ```typescript
 * const result = partition<number>((x) => x > 1)([1, 2, 3]);
 * console.log(result); // [[2, 3], [1]]
 * ```
 */
export function partition<T>(
  predicate: PredicateFunction<T>,
): CollectorFunction<T, [T[], T[]]> {
  return reduce(
    (previous, current, index) => {
      if (predicate(current, index)) {
        previous[0].push(current);
      } else {
        previous[1].push(current);
      }
      return previous;
    },
    () => [new Array<T>(), new Array<T>()],
  );
}
