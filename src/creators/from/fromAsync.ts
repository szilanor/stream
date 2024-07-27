import { AsyncStream } from "../../async-stream";

/**
 * Creates a Stream from an iterable (Array, Set, Map, Stream...)
 */
export function fromAsync<T>(iterable?: AsyncIterable<T>): AsyncStream<T> {
  return new AsyncStream(iterable);
}

export const streamAsync = fromAsync;
