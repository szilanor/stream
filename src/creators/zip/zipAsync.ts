import {doneResult, valueResult} from '../../utils';
import {AsyncStream} from '../../async-stream';

class ZipAsyncIterator<A, B, O> implements AsyncIterator<O> {
  constructor(
    private a: AsyncIterator<A>,
    private b: AsyncIterator<B>,
    private zipFunction: (a: A, b: B) => O
  ) {}

  async next(): Promise<IteratorResult<O>> {
    const {value: element1, done: done1} = await this.a.next();
    const {value: element2, done: done2} = await this.b.next();
    return done1 || done2
      ? doneResult()
      : valueResult(this.zipFunction(element1, element2));
  }
}

class ZipAsyncIterable<A, B, O> implements AsyncIterable<O> {
  constructor(
    private a: AsyncIterable<A>,
    private b: AsyncIterable<B>,
    private zipFunction: (a: A, b: B) => O
  ) {}

  [Symbol.asyncIterator](): AsyncIterator<O> {
    return new ZipAsyncIterator(
      this.a[Symbol.asyncIterator](),
      this.b[Symbol.asyncIterator](),
      this.zipFunction
    );
  }
}

/**
 * Returns a Stream that merges elements from both iterables by taking one
 * element from each, passing them to the function, and yielding the result.
 */
export function zipAsync<A, B, O>(
  a: AsyncIterable<A>,
  b: AsyncIterable<B>,
  zipFunction: (a: A, b: B) => O
): AsyncStream<O> {
  return new AsyncStream<O>(new ZipAsyncIterable(a, b, zipFunction));
}
