import type { AsyncCollectorFunction, PredicateFunction } from "~/types";

/**
 * Returns a collector that returns the number of entries in the Iterable.
 * @param predicateFunction A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the number of entries in the Iterable.
 *
 * @example
 * ```typescript
 * const result = countAsync((x) => x > 0)([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function countAsync<T>(
  predicateFunction: PredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, number> {
  return async (source) => {
    let counter = 0;
    let index = 0;
    for await (const entry of source) {
      if (predicateFunction(entry, index++)) {
        counter++;
      }
    }
    return counter;
  };
}

export const lengthAsync = countAsync;
