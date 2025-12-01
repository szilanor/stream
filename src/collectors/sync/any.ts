import type { CollectorFunction, PredicateFunction } from "~/types";

/**
 * Checks if any element in the source satisfies the predicate.
 * @param predicate Predicate function to determine if an element satisfies a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that checks if any element in the source satisfies the predicate.
 *
 * @example
 * ```typescript
 * const result = any<number>((x) => x > 2)([1, 2, 3]);
 * console.log(result); // true
 * ```
 */
export function any<T>(
  predicate: PredicateFunction<T> = () => true,
): CollectorFunction<T, boolean> {
  return (source) => {
    let index = 0;
    for (const entry of source) {
      if (predicate(entry, index++)) {
        return true;
      }
    }
    return false;
  };
}

export const some = any;
