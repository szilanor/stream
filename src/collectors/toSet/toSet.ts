import { CollectorFunction } from "../../types";

/**
 * Returns the source as a set.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the source as a set.
 *
 * @example
 * ```typescript
 * const result = toSet<number>()([1, 2, 3]);
 * console.log(result); // Set { 1, 2, 3 }
 * ```
 */
export function toSet<T>(): CollectorFunction<T, Set<T>> {
  return (source) => new Set<T>(source);
}
