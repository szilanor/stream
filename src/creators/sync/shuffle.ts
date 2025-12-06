import { Stream } from "~/stream";

/**
 * Returns a Stream that shuffles the items of the specified array.
 * @typeParam T Type of items in the Stream.
 * @param array Array to shuffle.
 * @returns Stream that yields the shuffled items of the specified array.
 *
 * @example
 * ```typescript
 * const result = shuffle([1, 2, 3]);
 * console.log([...result]); // [3, 1, 2]
 * ```
 */
export function shuffle<T>(array: T[]): Stream<T> {
  return new Stream([...array].sort(() => Math.random() - 0.5));
}
