import { Stream } from "~/stream";
import { callValueOrFactory, doneResult, valueResult } from "~/utils";
import { ValueOrFactory } from "~/types";

class ZipLongestIterator<A, B, F, O> implements Iterator<O> {
  constructor(
    private a: Iterator<A>,
    private b: Iterator<B>,
    private fillValue: ValueOrFactory<F>,
    private zipFunction: (a: A | F, b: B | F) => O,
  ) {}

  next(): IteratorResult<O> {
    const { value: element1, done: done1 } = this.a.next();
    const { value: element2, done: done2 } = this.b.next();
    return done1 && done2
      ? doneResult()
      : valueResult(
          this.zipFunction(
            done1 ? callValueOrFactory(this.fillValue) : element1,
            done2 ? callValueOrFactory(this.fillValue) : element2,
          ),
        );
  }
}

class ZipLongestIterable<A, B, F, O> implements Iterable<O> {
  constructor(
    private a: Iterable<A>,
    private b: Iterable<B>,
    private fillValue: ValueOrFactory<F>,
    private zipFunction: (a: A | F, b: B | F) => O,
  ) {}

  [Symbol.iterator](): Iterator<O> {
    return new ZipLongestIterator(
      this.a[Symbol.iterator](),
      this.b[Symbol.iterator](),
      this.fillValue,
      this.zipFunction,
    );
  }
}

/**
 * Returns a Stream that merges elements from both iterables by taking one
 * element from each, passing them to the function, and yielding the result.
 *
 * @param a The first iterable to merge.
 * @param b The second iterable to merge.
 * @param fillValue The value or factory to use when one iterable is done.
 * @param zipFunction The function that merges the elements.
 * @returns A Stream that merges elements from both iterables.
 *
 * @example
 * ```typescript
 * const result = zipLongest('ABCD', 'xy', ' ', (a, b) => `${a}${b}`);
 * console.log([...result]); // ['Ax', 'By', 'C ', 'D ']
 * ```
 */
export function zipLongest<A, B, F, O>(
  a: Iterable<A>,
  b: Iterable<B>,
  fillValue: ValueOrFactory<F>,
  zipFunction: (a: A | F, b: B | F) => O,
): Stream<O> {
  return new Stream<O>(new ZipLongestIterable(a, b, fillValue, zipFunction));
}
