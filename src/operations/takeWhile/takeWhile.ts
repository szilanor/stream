import {OperationFunction} from '../../types';
import {PredicateFunction, wrap} from '../../utils';

class TakeWhileIterator<T> implements Iterator<T> {
  index = 0;
  constructor(
    private iterator: Iterator<T>,
    private predicate: PredicateFunction<T>
  ) {}

  next(): IteratorResult<T> {
    const {done, value} = this.iterator.next();
    return {done: done || !this.predicate(value, this.index++), value};
  }
}

/** Returns an Iterable taking entries of the source Iterable while the parameter function returns true. */
export function takeWhile<T>(
  predicate: PredicateFunction<T>
): OperationFunction<T, T> {
  return wrap(iterator => new TakeWhileIterator(iterator, predicate));
}
