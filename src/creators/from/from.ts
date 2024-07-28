import { Stream } from "../../stream";

/**
 * Returns a Stream that yields the elements of the Iterable parameter.
 * @typeParam T Type of items in the Stream.
 * @param iterable Iterable to create the Stream from.
 * @returns Stream that yields the elements of the Iterable.
 * 
 * @example
 * ```typescript
 * const result = from('ABCD');
 * console.log([...result]); // ['A', 'B', 'C', 'D']
 * ```
 */
export function from<T>(iterable?: Iterable<T>): Stream<T> {
  return new Stream(iterable);
}

export const stream = from;
