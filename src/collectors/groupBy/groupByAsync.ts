import { AsyncCollectorFunction } from "../../types";
import { reduceAsync } from "../reduce";

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupByAsync<T, TKey>(
  keySelector: (entry: T) => TKey,
): AsyncCollectorFunction<T, Map<TKey, T[]>> {
  return reduceAsync(
    (result, entry) => {
      const key = keySelector(entry);
      const value = result.get(key);
      if (value) {
        value.push(entry);
      } else {
        return result.set(key, [entry]);
      }
      return result;
    },
    () => new Map<TKey, T[]>(),
  );
}
