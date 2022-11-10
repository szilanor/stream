import {fromAsyncIterator} from '../../utils';
import {AsyncStream} from '../../async-stream';

export class RangeAsyncIterator implements AsyncIterator<number> {
  private index = 0;

  constructor(private start: number, private count: number, private by = 1) {}

  async next(): Promise<IteratorResult<number>> {
    return this.index < this.count
      ? {done: false, value: this.start + this.index++ * this.by}
      : {done: true, value: undefined as unknown};
  }
}

/**
 * Returns a Stream that yields a range of values.
 */
export function rangeAsync(
  start: number,
  count: number,
  by = 1
): AsyncStream<number> {
  return new AsyncStream<number>(
    fromAsyncIterator(() => new RangeAsyncIterator(start, count, by))
  );
}
