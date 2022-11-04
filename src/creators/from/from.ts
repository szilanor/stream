import {Stream} from '../../stream';
import {AsyncStream} from '../../async-stream';

/**
 * Creates a Stream from an iterable (Array, Set, Map, Stream...)
 */
export function from<T>(iterable: Iterable<T>): Stream<T> {
  return new Stream(iterable);
}

export function fromAsync<T>(iterable: AsyncIterable<T>): AsyncStream<T> {
  return new AsyncStream<T>(iterable);
}
