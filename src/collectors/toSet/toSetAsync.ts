import { AsyncCollectorFunction } from "../../types";
import { reduceAsync } from "../reduce";

/** Creates a Set from an Iterable */
export function toSetAsync<T>(): AsyncCollectorFunction<T, Set<T>> {
  return reduceAsync(
    (result, entry) => result.add(entry),
    () => new Set<T>(),
  );
}
