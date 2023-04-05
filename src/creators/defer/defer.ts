import {Stream} from '../../stream';

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

export function defer<T>(factory: () => Iterable<T>): Stream<T> {
  return new Stream<T>(new DeferIterable(factory));
}
