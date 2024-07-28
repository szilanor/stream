import { Stream } from "../../stream";

/**
 * Returns a Stream that is empty.
 * @typeParam T Type of items in the Stream.
 * @returns Stream that is empty.
 * 
 * @example
 * ```typescript
 * const result = empty();
 * console.log([...result]); // []
 * ```
 */
export function empty<T>(): Stream<T> {
  return new Stream<T>();
}
