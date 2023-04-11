import {OperationFunction} from '../../types';
import {doneResult, fromIteratorMapper, valueResult} from '../../utils';

class TakeIterator<T> implements Iterator<T> {
  index = 0;

  constructor(private iterator: Iterator<T>, private count: number) {}

  next(): IteratorResult<T> {
    const {done, value} = this.iterator.next();
    if (done || this.index++ >= this.count) {
      return doneResult();
    }
    return valueResult(value);
  }
}

/** Returns an Iterable taking the given amount of entries of the source Iterable. */
export function take<T>(count: number): OperationFunction<T, T> {
  return fromIteratorMapper(iterator => new TakeIterator(iterator, count));
}
