import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/** Creates a Set from an Iterable */
export function toSetAsync<T>(): AsyncCollectorFunction<T, Set<T>> {
  return reduceAsync(
    (result, entry) => result.add(entry),
    () => new Set<T>(),
  );
}
