import { CollectorFunction } from "../../types";
import { reduce } from "../reduce";
import { CompareFunction } from "../../utils";

/**
 * Returns the element in the source that has the maximum value according to the comparer.
 * @param comparer Comparer function to determine the maximum value.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the element in the source that has the maximum value according to the comparer.
 * 
 * @example
 * ```typescript
 * const result = maxBy<number>((a, b) => a - b)([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function maxBy<T>(
  comparer: CompareFunction<T>,
): CollectorFunction<T, T | undefined> {
  return reduce<T, T | undefined>(
    (prev, curr) =>
      prev === undefined || comparer(prev, curr) < 0 ? curr : prev,
    () => undefined,
  );
}
