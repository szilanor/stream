import {Stream} from '../../stream';

/*
 * Creates a Stream that returns 0 entries
 */
export function empty<T>(): Stream<T> {
  return new Stream<T>();
}
