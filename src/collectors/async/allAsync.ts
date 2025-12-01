import type { AsyncCollectorFunction, MaybeAsyncPredicateFunction } from "~/types";

/** Returns true if all entries satisfy the 'predicate' function. */
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
