import type {
  AsyncCollectorFunction,
  MaybeAsyncPredicateFunction,
} from "~/types";

/**
 * Returns a collector that returns the last entry from the Iterable that satisfies the 'predicate' function.
 * @param predicate A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the last entry from the Iterable that satisfies the 'predicate' function.
 *
 * @example
 * ```typescript
 * const result = lastAsync((x) => x > 0)([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function lastAsync<T>(
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, T | undefined> {
  return async (source) => {
    let last = undefined;
    let index = 0;
    for await (const entry of source) {
      if (await predicate(entry, index++)) {
        last = entry;
      }
    }
    return last;
  };
}

export const findLastAsync = lastAsync;
