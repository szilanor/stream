import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/** Creates a Map from an Iterable */
export function toMapAsync<T, TKey, TValue>(
  keySelector: (entry: T) => TKey,
  valueSelector: (entry: T) => TValue,
): AsyncCollectorFunction<T, Map<TKey, TValue>> {
  return reduceAsync(
    (result, entry) => result.set(keySelector(entry), valueSelector(entry)),
    () => new Map<TKey, TValue>(),
  );
}
