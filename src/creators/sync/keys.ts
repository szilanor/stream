import { Stream } from "~/stream";

/**
 * Returns a Stream that yields the keys of the specified object.
 * @typeParam T Type of items in the Stream.
 * @param entry Object to create the Stream from.
 * @returns Stream that yields the keys of the specified object.
 *
 * @example
 * ```typescript
 * const result = keys({ a: 1, b: 2 });
 * console.log([...result]); // ["a", "b"]
 * ```
 */
export function keys<T extends {}>(entry: T): Stream<keyof T> {
  return new Stream(Object.keys(entry) as Array<keyof T>);
}
