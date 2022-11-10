import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class TakeIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(private iterator: Iterator<T>, private count: number) {}

  next(): IteratorResult<T> {
    const item = this.iterator.next();
    return {done: item.done || this.index++ >= this.count, value: item.value};
  }
}

/** Returns an Iterable taking the given amount of entries of the source Iterable. */
export function take<T>(count: number): OperationFunction<T, T> {
  return operationFunctionFactory(
    iterator => new TakeIterator(iterator, count)
  );
}
