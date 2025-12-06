import type {
  AsyncCollectorFunction,
  MaybeAsyncPredicateFunction,
} from "~/types";

/**
 * Returns a collector that returns true if at least one of the entries satisfies the 'predicate' function.
 * @param predicate A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns true if at least one of the entries satisfies the 'predicate' function.
 *
 * @example
 * ```typescript
 * const result = anyAsync((x) => x > 0)([1, 2, 3]);
 * console.log(result); // true
 * ```
 */
export function anyAsync<T>(
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, boolean> {
  return async (source) => {
    let index = 0;
    for await (const entry of source) {
      if (await predicate(entry, index++)) {
        return true;
      }
    }
    return false;
  };
}

export const someAsync = anyAsync;
