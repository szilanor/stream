import {OperationFunction} from '../../types';

export class TakeWhileIterator<T> implements IterableIterator<T> {
  constructor(
    private iterator: Iterator<T>,
    private predicate: (entry: T) => boolean
  ) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    const item = this.iterator.next();
    return {done: item.done || !this.predicate(item.value), value: item.value};
  }
}

/** Returns an Iterable taking entries of the source Iterable while the parameter function returns true. */
export function takeWhile<T>(
  predicate: (entry: T) => boolean
): OperationFunction<T, T> {
  return entries =>
    new TakeWhileIterator(entries[Symbol.iterator](), predicate);
}
