import { CollectorFunction } from "../../types";
import { reduce } from "../reduce";

/**
 * Returns the sum of the source.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the sum of the source.
 *
 * @example
 * ```typescript
 * const result = sum<number>()([1, 2, 3]);
 * console.log(result); // 6
 * ```
 */
export function sum(): CollectorFunction<number, number | undefined> {
  return reduce(
    (prev: number | undefined, curr: number) =>
      prev === undefined ? curr : prev + curr,
    () => undefined,
  );
}
