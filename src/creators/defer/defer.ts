import { Stream } from "../../stream";

class DeferIterable<T> implements Iterable<T> {
  private _iterable?: Iterable<T>;

  constructor(private factory: () => Iterable<T>) {}

  [Symbol.iterator](): Iterator<T> {
    if (!this._iterable) {
      this._iterable = this.factory();
    }
    return this._iterable[Symbol.iterator]();
  }
}

/**
 * Returns a Stream that defers the creation of the Iterable until the Stream is iterated.
 * @param factory Factory function that returns an Iterable.
 * @typeParam T Type of items in the Iterable.
 * @returns Stream that defers the creation of the Iterable.
 *
 * @example
 * ```typescript
 * const result = defer(() => 'ABCD');
 * console.log([...result]); // ['A', 'B', 'C', 'D']
 * ```
 */
export function defer<T>(factory: () => Iterable<T>): Stream<T> {
  return new Stream<T>(new DeferIterable(factory));
}
