import { AsyncCollectorFunction } from "../../types";

/** Returns the nth entry from the Iterable. */
export function elementAtAsync<T>(
  index: number,
): AsyncCollectorFunction<T, T | undefined> {
  return async (source) => {
    let i = 0;
    for await (const entry of source) {
      if (i === index) {
        return entry;
      }
      i++;
    }
    return undefined;
  };
}
