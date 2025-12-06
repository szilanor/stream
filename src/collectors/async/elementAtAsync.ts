import type { AsyncCollectorFunction } from "~/types";

/**
 * Returns a collector that returns the nth entry from the Iterable.
 * @param index Index of the entry to return.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the nth entry from the Iterable.
 *
 * @example
 * ```typescript
 * const result = elementAtAsync(2)([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function elementAtAsync<T>(
  index: number,
): AsyncCollectorFunction<T, T | undefined> {
  return async (source) => {
    let i = 0;
    for await (const entry of source) {
      if (i === index) {
        return entry;
      }
      i++;
    }
    return undefined;
  };
}
