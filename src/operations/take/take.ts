import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class TakeIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(private iterator: Iterator<T>, private count: number) {}

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
  return operationFunctionFactory(
    iterator => new TakeIterator(iterator, count)
  );
}
