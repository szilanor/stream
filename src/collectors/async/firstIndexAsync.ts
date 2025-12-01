import type { AsyncCollectorFunction, MaybeAsyncPredicateFunction } from "~/types";

/** Returns the index of the first entry from the Iterable that satisfy then 'predicate' function. */
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
