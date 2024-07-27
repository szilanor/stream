import { AsyncStream } from "../../async-stream";

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

export function deferAsync<T>(factory: () => AsyncIterable<T>): AsyncStream<T> {
  return new AsyncStream<T>(new DeferAsyncIterable(factory));
}
