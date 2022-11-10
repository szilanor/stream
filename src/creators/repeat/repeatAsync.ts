import {fromAsyncIterator} from '../../utils';
import {AsyncStream} from '../../async-stream';

export class RepeatAsyncIterator<T> implements AsyncIterator<T> {
  private index = 0;

  constructor(private value: T, private times: number) {}

  async next(): Promise<IteratorResult<T>> {
    this.index++;
    return this.index <= this.times
      ? {done: false, value: this.value}
      : {done: true, value: undefined as unknown};
  }
}

/**
 * Returns a Stream that yields the value a specified number
 * of times, or indefinitely if the 'times' parameter is omitted.
 */
export function repeatAsync<T>(
  value: T,
  times: number = Number.POSITIVE_INFINITY
): AsyncStream<T> {
  return new AsyncStream<T>(
    fromAsyncIterator(() => new RepeatAsyncIterator(value, times))
  );
}
