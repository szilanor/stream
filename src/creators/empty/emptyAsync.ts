import {AsyncStream} from '../../async-stream';

/*
 * Creates a Stream that returns 0 entries
 */
export function emptyAsync<T>(): AsyncStream<T> {
  return new AsyncStream<T>();
}
