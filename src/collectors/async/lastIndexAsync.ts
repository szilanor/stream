import type {
  AsyncCollectorFunction,
  MaybeAsyncPredicateFunction,
} from "~/types";

/**
 * Returns a collector that returns the index of the last entry from the Iterable that satisfies the 'predicate' function.
 * @param predicate A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the index of the last entry from the Iterable that satisfies the 'predicate' function.
 *
 * @example
 * ```typescript
 * const result = lastIndexAsync((x) => x > 0)([1, 2, 3]);
 * console.log(result); // 2
 * ```
 */
export function lastIndexAsync<T>(
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, number> {
  return async (source) => {
    let index = -1;
    let lastIndex = index;
    for await (const entry of source) {
      index++;
      if (await predicate(entry, index)) {
        lastIndex = index;
      }
    }
    return lastIndex;
  };
}

export const findLastIndexAsync = lastIndexAsync;
