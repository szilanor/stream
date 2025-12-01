import type { CollectorFunction, PredicateFunction } from "~/types";

/**
 * Checks if all elements in the source satisfy the predicate.
 * @param predicate Predicate function to determine if an element satisfies a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that checks if all elements in the source satisfy the predicate.
 *
 * @example
 * ```typescript
 * const result = all<number>((x) => x > 0)([1, 2, 3]);
 * console.log(result); // true
 * ```
 */
export function all<T>(
  predicate: PredicateFunction<T>,
): CollectorFunction<T, boolean> {
  return (source) => {
    let index = 0;
    for (const entry of source) {
      if (!predicate(entry, index++)) {
        return false;
      }
    }
    return true;
  };
}

export const every = all;
