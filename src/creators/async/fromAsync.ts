import { AsyncStream } from "~/asyncStream";

/**
 * Returns an AsyncStream from an iterable (Array, Set, Map, Stream...)
 * @param iterable Iterable to convert to an AsyncStream.
 * @typeParam T Type of items in the iterable.
 * @returns AsyncStream that yields elements of the iterable.
 *
 * @example
 * ```typescript
 * const result = fromAsync<number>([1, 2, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function fromAsync<T>(iterable?: AsyncIterable<T>): AsyncStream<T> {
  return new AsyncStream(iterable);
}

export const streamAsync = fromAsync;
