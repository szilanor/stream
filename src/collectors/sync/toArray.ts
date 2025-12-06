import type { CollectorFunction } from "~/types";

/**
 * Returns a collector that returns the source as an array.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the source as an array.
 *
 * @example
 * ```typescript
 * const result = toArray<number>()([1, 2, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function toArray<T>(): CollectorFunction<T, T[]> {
  return (source) => Array.from(source);
}
