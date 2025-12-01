import { Stream } from "~/stream";

/**
 * Returns a Stream that yields the entries of the specified object.
 * @typeParam T Type of items in the Stream.
 * @param entry Object to create the Stream from.
 * @returns Stream that yields the entries of the specified object.
 *
 * @example
 * ```typescript
 * const result = entries({ a: 1, b: 2 });
 * console.log([...result]); // [["a", 1], ["b", 2]]
 * ```
 */
export function entries<T extends object>(
  entry: T,
): Stream<[keyof T, T[keyof T]]> {
  return new Stream(Object.entries(entry) as Array<[keyof T, T[keyof T]]>);
}
