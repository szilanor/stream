import { AsyncStream } from "~/asyncStream";

class DeferAsyncIterable<T> implements AsyncIterable<T> {
  private _asyncIterable?: AsyncIterable<T>;

  constructor(private factory: () => AsyncIterable<T>) {}

  [Symbol.asyncIterator](): AsyncIterator<T> {
    if (!this._asyncIterable) {
      this._asyncIterable = this.factory();
    }
    return this._asyncIterable[Symbol.asyncIterator]();
  }
}

/**
 * Returns an AsyncStream that yields elements of the Iterable returned by the factory function.
 * @param factory Factory function that returns an Iterable.
 * @typeParam T Type of items in the source.
 * @returns AsyncStream that yields elements of the Iterable returned by the factory function.
 *
 * @example
 * ```typescript
 * const result = deferAsync<number>(() => [1, 2, 3]);
 * console.log(result); // [1, 2, 3]
 * ```
 */
export function deferAsync<T>(factory: () => AsyncIterable<T>): AsyncStream<T> {
  return new AsyncStream<T>(new DeferAsyncIterable(factory));
}
