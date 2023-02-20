import {Stream} from '../../stream';
import {doneResult, valueResult} from '../../utils';

class ZipIterator<A, B, O> implements Iterator<O> {
  constructor(
    private a: Iterator<A>,
    private b: Iterator<B>,
    private zipFunction: (a: A, b: B) => O
  ) {}

  next(): IteratorResult<O> {
    const {value: element1, done: done1} = this.a.next();
    const {value: element2, done: done2} = this.b.next();
    return done1 || done2
      ? doneResult()
      : valueResult(this.zipFunction(element1, element2));
  }
}

class ZipIterable<A, B, O> implements Iterable<O> {
  constructor(
    private a: Iterable<A>,
    private b: Iterable<B>,
    private zipFunction: (a: A, b: B) => O
  ) {}

  [Symbol.iterator](): Iterator<O> {
    return new ZipIterator(
      this.a[Symbol.iterator](),
      this.b[Symbol.iterator](),
      this.zipFunction
    );
  }
}

/**
 * Returns a Stream that merges elements from both iterables by taking one
 * element from each, passing them to the function, and yielding the result.
 */
export function zip<A, B, O>(
  a: Iterable<A>,
  b: Iterable<B>,
  zipFunction: (a: A, b: B) => O
): Stream<O> {
  return new Stream<O>(new ZipIterable(a, b, zipFunction));
}
