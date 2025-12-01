import { Stream } from "~/stream";

/**
 * Returns a Stream that yields the specified entries.
 * @typeParam T Type of items in the Stream.
 * @param entries Entries to create the Stream from.
 * @returns Stream that yields the specified entries.
 *
 * @example
 * ```typescript
 * const result = of(1, 2, 3);
 * console.log([...result]); // [1, 2, 3]
 * ```
 */
export function of<T>(...entries: T[]): Stream<T> {
  return new Stream(entries);
}

export const streamOf = of;
