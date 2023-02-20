import {Stream} from '../../stream';

/**
 * Creates a Stream from an iterable (Array, Set, Map, Stream...)
 */
export function from<T>(iterable: Iterable<T>): Stream<T> {
  return new Stream(iterable);
}

export const stream = from;
