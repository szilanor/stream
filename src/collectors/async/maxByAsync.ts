import type { AsyncCollectorFunction, CompareFunction } from "~/types";
import { reduceAsync } from "~/collectors/async/reduceAsync";

/**
 * Returns a collector that returns the largest value of all entries in the Iterable based on the comparer function.
 * @param comparer A function that defines the sort order of the elements.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the largest value of all entries in the Iterable based on the comparer function.
 *
 * @example
 * ```typescript
 * const result = maxByAsync((a, b) => a - b)([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function maxByAsync<T>(
  comparer: CompareFunction<T>,
): AsyncCollectorFunction<T, T | undefined> {
  return reduceAsync<T, T | undefined>(
    (prev, curr) =>
      prev === undefined || comparer(prev, curr) < 0 ? curr : prev,
    () => undefined,
  );
}
