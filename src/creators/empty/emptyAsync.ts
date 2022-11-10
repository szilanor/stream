import {fromAsyncIterator} from '../../utils';
import {AsyncStream} from '../../async-stream';

export class EmptyAsyncIterator<T> implements AsyncIterator<T> {
  async next(): Promise<IteratorResult<T>> {
    return {done: true, value: undefined as unknown};
  }
}

/*
 * Creates a Stream that returns 0 entries
 */
export function emptyAsync<T>(): AsyncStream<T> {
  return new AsyncStream<T>(fromAsyncIterator(() => new EmptyAsyncIterator()));
}
