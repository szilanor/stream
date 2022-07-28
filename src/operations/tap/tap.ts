import {OperationFunction} from '../../types';

export class TapIterator<T> implements IterableIterator<T> {
  constructor(
    private iterator: Iterator<T>,
    private callback: (item: T) => void
  ) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    const item = this.iterator.next();
    if (!item.done) {
      this.callback(item.value);
    }
    return item;
  }
}

/** Calls a callback function on each entry */
export function tap<T>(callback: (item: T) => void): OperationFunction<T, T> {
  return entries => new TapIterator(entries[Symbol.iterator](), callback);
}
