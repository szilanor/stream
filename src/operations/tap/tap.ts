import {IterableIteratorBase, OperationFunction} from '../../types';

export class TapIterator<T> extends IterableIteratorBase<T> {
  constructor(iterable: Iterable<T>, private callback: (item: T) => void) {
    super(iterable);
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
  return iterable => new TapIterator(iterable, callback);
}
