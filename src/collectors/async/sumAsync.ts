import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "~/collectors/async/reduceAsync";

/**
 * Returns a collector that returns the sum of all entries in the Iterable.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the sum of all entries in the Iterable.
 *
 * @example
 * ```typescript
 * const result = sumAsync()([1, 2, 3]);
 * console.log(result); // 6
 * ```
 */
export function sumAsync(): AsyncCollectorFunction<number, number | undefined> {
  return reduceAsync(
    (prev: number | undefined, curr: number) =>
      prev === undefined ? curr : prev + curr,
    () => undefined,
  );
}
