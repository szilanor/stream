import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';

export class IndexedIterator<T> implements Iterator<[T, number]> {
  private index = 0;
  constructor(private iterator: Iterator<T>) {}

  next(): IteratorResult<[T, number]> {
    const {value, done} = this.iterator.next();
    return done ? doneResult() : valueResult([value, this.index++]);
  }
}

export function withIndex<T>(): OperationFunction<T, [T, number]> {
  return wrap(iterator => new IndexedIterator(iterator));
}
