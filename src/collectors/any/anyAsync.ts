import { AsyncCollectorFunction } from "../../types";
import { MaybeAsyncPredicateFunction } from "../../utils";

/** Returns true if at least one of the entries satisfies the 'predicate' function. */
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
