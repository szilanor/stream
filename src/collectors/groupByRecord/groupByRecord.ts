import { CollectorFunction } from "../../types";
import { reduce } from "../reduce";

/** Creates a group of entries where the group key is calculated by the selector function. */
export function groupByRecord<T, TKey extends string | number | symbol>(
  keySelector: (entry: T) => TKey,
): CollectorFunction<T, Record<TKey, T[]>> {
  return reduce(
    (result, entry) => {
      const key = keySelector(entry);
      const value = result[key];
      if (value) {
        value.push(entry);
      } else {
        result[key] = [entry];
      }
      return result;
    },
    () => ({}) as Record<TKey, T[]>,
  );
}

export const group = groupByRecord;
