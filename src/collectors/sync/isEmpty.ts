import type { CollectorFunction } from "~/types";

/**
 * Returns a collector that determines if the source is empty.
 * @typeParam T Type of items in the source.
 * @returns Collector that determines if the source is empty.
 *
 * @example
 * ```typescript
 * const result = isEmpty<number>()([1, 2, 3]);
 * console.log(result); // false
 * ```
 */
export function isEmpty<T>(): CollectorFunction<T, boolean> {
  return (source) => source[Symbol.iterator]().next().done === true;
}
