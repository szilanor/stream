import {AsyncStream} from '../../async-stream';

/**
 * Return a Stream from the parameter entries
 */
export function ofAsync<T>(...entries: T[]): AsyncStream<T> {
  return new AsyncStream(entries);
}
