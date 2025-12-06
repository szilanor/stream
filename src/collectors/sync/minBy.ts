import type { CollectorFunction, CompareFunction } from "~/types";
import { maxBy } from "./maxBy";

/**
 * Returns a collector that returns the element in the source that has the minimum value according to the comparer.
 * @param comparer Comparer function to determine the minimum value.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the element in the source that has the minimum value according to the comparer.
 *
 * @example
 * ```typescript
 * const result = minBy<number>((a, b) => a - b)([1, 2, 3]);
 * console.log(result); // 1
 * ```
 */
export function minBy<T>(
  comparer: CompareFunction<T>,
): CollectorFunction<T, T | undefined> {
  return maxBy((a, b) => -1 * comparer(a, b));
}
