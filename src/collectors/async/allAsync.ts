import type {
  AsyncCollectorFunction,
  MaybeAsyncPredicateFunction,
} from "~/types";

/**
 * Returns a collector that returns true if all entries satisfy the 'predicate' function.
 * @param predicate A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns true if all entries satisfy the 'predicate' function.
 * @example
 * ```typescript
 * const result = allAsync((x) => x > 0)([1, 2, 3]);
 * console.log(result); // true
 * ```
 */
export function allAsync<T>(
  predicate: MaybeAsyncPredicateFunction<T>,
): AsyncCollectorFunction<T, boolean> {
  return async (source) => {
    let index = 0;
    for await (const entry of source) {
      if (!(await predicate(entry, index++))) {
        return false;
      }
    }
    return true;
  };
}

export const everyAsync = allAsync;
