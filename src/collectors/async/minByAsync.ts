import type { AsyncCollectorFunction, CompareFunction } from "~/types";
import { maxByAsync } from "./maxByAsync";

/**
 * Returns a collector that returns the smallest value of all entries in the Iterable based on the comparer function.
 * @param comparer A function that defines the sort order of the elements.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the smallest value of all entries in the Iterable based on the comparer function.
 *
 * @example
 * ```typescript
 * const result = minByAsync((a, b) => a - b)([1, 2, 3]);
 * console.log(result); // 1
 * ```
 */
export function minByAsync<T>(
  comparer: CompareFunction<T>,
): AsyncCollectorFunction<T, T | undefined> {
  return maxByAsync((a, b) => -1 * comparer(a, b));
}
