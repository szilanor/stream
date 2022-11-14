import {OperationFunction} from '../../types';

export class TapIterator<T> implements IterableIterator<T> {
  constructor(
    private iterator: Iterator<T>,
    private callback: (item: T) => void
  ) {}

  next(): IteratorResult<T> {
    const item = this.iterator.next();
    if (!item.done) {
      this.callback(item.value);
    }
    return item;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}

/** Calls a callback function on each entry */
export function tap<T>(callback: (item: T) => void): OperationFunction<T, T> {
  return iterable => new TapIterator(iterable[Symbol.iterator](), callback);
}
