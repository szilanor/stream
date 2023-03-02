import {
  doneResult,
  fromAsyncIterator,
  getIterator,
  valueResult,
} from '../../utils';
import {AsyncStream} from '../../async-stream';

class ConcatAsyncIterator<T> implements AsyncIterator<T> {
  private index = 0;
  private iterator: AsyncIterator<T> | Iterator<T> | undefined;

  constructor(private iterables: Array<Iterable<T> | AsyncIterable<T>>) {}

  async next(): Promise<IteratorResult<T>> {
    while (this.index < this.iterables.length) {
      this.iterator = this.iterator || getIterator(this.iterables[this.index]);
      const {value, done} = await this.iterator.next();
      if (done) {
        this.index++;
        if (this.index < this.iterables.length) {
          this.iterator = getIterator(this.iterables[this.index]);
        }
      } else {
        return valueResult(value);
      }
    }
    this.iterator = undefined;
    return doneResult();
  }
}

/**
 * Returns a Stream that yields elements of all Iterable parameters in order.
 */
export function concatAsync<T>(
  ...iterables: Array<Iterable<T> | AsyncIterable<T>>
): AsyncStream<T> {
  return new AsyncStream<T>(
    fromAsyncIterator(() => new ConcatAsyncIterator(iterables))
  );
}
