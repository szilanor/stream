import {Stream} from '../../stream';

/**
 * Return a Stream from the parameter entries
 */
export function streamOf<T>(...entries: T[]): Stream<T> {
  return new Stream(entries);
}
