import type { AsyncCollectorFunction, EqualsFunction } from "~/types";

/**
 * Returns a collector that returns true if at least one of the entries equals with the given 'value'.
 * @param value Value to search for.
 * @param equalsFunction Function to compare items.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns true if at least one of the entries equals with the given 'value'.
 *
 * @example
 * ```typescript
 * const result = containsAsync(2)([1, 2, 3]);
 * console.log(result); // true
 * ```
 */
export function containsAsync<T>(
  value: T,
  equalsFunction: EqualsFunction<T> = (a, b) => a === b,
): AsyncCollectorFunction<T, boolean> {
  return async (source) => {
    for await (const entry of source) {
      if (equalsFunction(entry, value)) {
        return true;
      }
    }
    return false;
  };
}

export const includesAsync = containsAsync;
