import type {
  AsyncCollectorFunction,
  MaybeAsyncPredicateFunction,
} from "~/types";

/**
 * Returns a collector that returns the index of the first entry from the Iterable that satisfies the 'predicate' function.
 * @param predicate A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the index of the first entry from the Iterable that satisfies the 'predicate' function.
 *
 * @example
 * ```typescript
 * const result = firstIndexAsync((x) => x > 0)([1, 2, 3]);
 * console.log(result); // 0
 * ```
 */
export function firstIndexAsync<T>(
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, number> {
  return async (source) => {
    let index = 0;
    for await (const entry of source) {
      if (await predicate(entry, index)) {
        return index;
      }
      index++;
    }
    return -1;
  };
}

export const findIndexAsync = firstIndexAsync;
