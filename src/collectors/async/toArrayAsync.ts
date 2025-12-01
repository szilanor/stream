import type { AsyncCollectorFunction } from "~/types";
import { reduceAsync } from "./reduceAsync";

/** Creates an Array from an Iterable */
export function toArrayAsync<T>(): AsyncCollectorFunction<T, T[]> {
  return reduceAsync(
    (result, entry) => {
      result.push(entry);
      return result;
    },
    () => [] as T[],
  );
}
