import type { AsyncCollectorFunction } from "~/types";

/**
 * Returns a collector that returns true if the AsyncIterable has 0 entry.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns true if the AsyncIterable has 0 entry.
 *
 * @example
 * ```typescript
 * const result = isEmptyAsync()([]);
 * console.log(result); // true
 * ```
 */
export function isEmptyAsync<T>(): AsyncCollectorFunction<T, boolean> {
  return async (source) =>
    (await source[Symbol.asyncIterator]().next()).done === true;
}
