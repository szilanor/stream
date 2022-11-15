import {IndexedIterableIteratorBase, OperationFunction} from '../../types';

export class TakeIterator<T> extends IndexedIterableIteratorBase<T> {
  constructor(iterable: Iterable<T>, private count: number) {
    super(iterable);
  }

  next(): IteratorResult<T> {
    const {done, value} = this.iterator.next();
    if (done || this.index++ >= this.count) {
      return {done: true, value: undefined as unknown};
    }
    return {done: false, value: value};
  }
}

/** Returns an Iterable taking the given amount of entries of the source Iterable. */
export function take<T>(count: number): OperationFunction<T, T> {
  return iterable => new TakeIterator(iterable, count);
}
