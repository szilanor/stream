import { Stream } from "~/stream";

class ProductIteratorIterable<A, B, O> implements Iterable<O> {
  constructor(
    private a: Iterable<A>,
    private b: Iterable<B>,
    private productFunction: (a: A, b: B) => O,
  ) {}

  *[Symbol.iterator](): Iterator<O> {
    for (const element1 of this.a) {
      for (const element2 of this.b) {
        yield this.productFunction(element1, element2);
      }
    }
  }
}

/**
 * Returns a Stream that merges elements from both iterables by taking one
 * element from each, passing them to the function, and yielding the result.
 *
 * @param a The first iterable to merge.
 * @param b The second iterable to merge.
 * @param productFunction The function that merges the elements.
 * @returns A Stream that merges elements from both iterables.
 *
 * @example
 * ```typescript
 * const result = product('ABCD', 'xy', (a, b) => `${a}${b}`);
 * console.log([...result]); // ['Ax', 'Ay', 'Bx', 'By', 'Cx', 'Cy', 'Dx', 'Dy']
 * ```
 */
export function product<A, B, O>(
  a: Iterable<A>,
  b: Iterable<B>,
  productFunction: (a: A, b: B) => O,
): Stream<O> {
  return new Stream<O>(new ProductIteratorIterable(a, b, productFunction));
}
