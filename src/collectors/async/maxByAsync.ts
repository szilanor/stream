import type { AsyncCollectorFunction, CompareFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/** Return the largest value of all entries in the Iterable based on the comparer function */
export function maxByAsync<T>(
  comparer: CompareFunction<T>,
): AsyncCollectorFunction<T, T | undefined> {
  return reduceAsync<T, T | undefined>(
    (prev, curr) =>
      prev === undefined || comparer(prev, curr) < 0 ? curr : prev,
    () => undefined,
  );
}
