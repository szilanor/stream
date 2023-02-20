import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';

export class SkipIterator<T> implements Iterator<T> {
  index = 0;
  constructor(private iterator: Iterator<T>, private count: number) {}

  next(): IteratorResult<T> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.index++ >= this.count) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/** Returns an Iterable skipping the given amount of entries of the source Iterable. */
export function skip<T>(count: number): OperationFunction<T, T> {
  return wrap(iterator => new SkipIterator(iterator, count));
}
