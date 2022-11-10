import {AsyncStream} from '../../async-stream';

/**
 * Creates a Stream from an iterable (Array, Set, Map, Stream...)
 */
export function fromAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
): AsyncStream<T> {
  return new AsyncStream<T>(iterable);
}
