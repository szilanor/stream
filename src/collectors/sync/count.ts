import type { CollectorFunction, PredicateFunction } from "~/types";

/**
 * Counts the number of elements in the source.
 * @param predicateFunction Predicate function to determine if an element should be counted.
 * @typeParam T Type of items in the source.
 * @returns Collector that counts the number of elements in the source.
 *
 * @example
 * ```typescript
 * const result = count<number>()([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function count<T>(
  predicateFunction: PredicateFunction<T> = () => true,
): CollectorFunction<T, number> {
  return (source) => {
    let counter = 0;
    let index = 0;
    for (const entry of source) {
      if (predicateFunction(entry, index++)) {
        counter++;
      }
    }
    return counter;
  };
}

export const length = count;
