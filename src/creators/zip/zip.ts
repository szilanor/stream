import {Stream} from '../../stream';

/**
 * Returns a Stream that merges elements from both iterables by taking one
 * element from each, passing them to the function, and yielding the result.
 */
export function zip<A, B, O>(
  a: Iterable<A>,
  b: Iterable<B>,
  zipFunction: (a: A, b: B) => O
): Stream<O> {
  return new Stream<O>(
    (function* () {
      const iteratorA = a[Symbol.iterator]();
      const iteratorB = b[Symbol.iterator]();
      while (true) {
        const {value: element1, done: done1} = iteratorA.next();
        const {value: element2, done: done2} = iteratorB.next();
        if (done1 || done2) break;
        yield zipFunction(element1, element2);
      }
    })()
  );
}
