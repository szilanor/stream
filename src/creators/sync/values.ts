import { Stream } from "~/stream";

/**
 * Returns a Stream that yields the values of the specified object.
 * @typeParam T Type of items in the Stream.
 * @param entry Object to create the Stream from.
 * @returns Stream that yields the values of the specified object.
 *
 * @example
 * ```typescript
 * const result = values({ a: 1, b: 2 });
 * console.log([...result]); // [1, 2]
 * ```
 */
export function values<T extends object>(entry: T): Stream<T[keyof T]> {
  return new Stream(Object.values(entry));
}
