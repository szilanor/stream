import type { CollectorFunction, EqualsFunction } from "~/types";

/**
 * Returns a collector that checks if the source contains a specific value.
 * @param value Value to check for.
 * @param equalsFunction Optional function to compare values.
 * @typeParam T Type of items in the source.
 * @returns Collector that checks if the source contains a specific value.
 *
 * @example
 * ```typescript
 * const result = contains(2)([1, 2, 3]);
 * console.log(result); // true
 * ```
 */
export function contains<T>(
  value: T,
  equalsFunction: EqualsFunction<T> = (a, b) => a === b,
): CollectorFunction<T, boolean> {
  return (source) => {
    for (const entry of source) {
      if (equalsFunction(entry, value)) {
        return true;
      }
    }
    return false;
  };
}

export const includes = contains;
