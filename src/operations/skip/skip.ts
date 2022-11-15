import {IndexedIterableIteratorBase, OperationFunction} from '../../types';

export class SkipIterator<T> extends IndexedIterableIteratorBase<T> {
  constructor(iterable: Iterable<T>, private count: number) {
    super(iterable);
  }

  next(): IteratorResult<T> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.index++ >= this.count) {
        return this.valueResult(value);
      }
    }
    return this.doneResult();
  }
}

/** Returns an Iterable skipping the given amount of entries of the source Iterable. */
export function skip<T>(count: number): OperationFunction<T, T> {
  return iterable => new SkipIterator(iterable, count);
}
