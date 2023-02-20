import {OperationFunction} from '../../types';
import {wrap} from '../../utils';

export class TakeWhileIterator<T> implements Iterator<T> {
  constructor(
    private iterator: Iterator<T>,
    private predicate: (entry: T) => boolean
  ) {}

  next(): IteratorResult<T> {
    const {done, value} = this.iterator.next();
    return {done: done || !this.predicate(value), value};
  }
}

/** Returns an Iterable taking entries of the source Iterable while the parameter function returns true. */
export function takeWhile<T>(
  predicate: (entry: T) => boolean
): OperationFunction<T, T> {
  return wrap(iterator => new TakeWhileIterator(iterator, predicate));
}
