import type { AsyncCollectorFunction, MaybeAsyncPredicateFunction } from "~/types";

/** Returns the first entry from the Iterable that satisfy then 'predicate' function. */
export function firstAsync<T>(
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, T | undefined> {
  return async (source) => {
    let index = 0;
    for await (const entry of source) {
      if (await predicate(entry, index++)) {
        return entry;
      }
    }
    return undefined;
  };
}

export const findAsync = firstAsync;
