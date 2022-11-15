import {IterableIteratorBase, OperationFunction} from '../../types';

export class TakeWhileIterator<T> extends IterableIteratorBase<T> {
  constructor(iterable: Iterable<T>, private predicate: (entry: T) => boolean) {
    super(iterable);
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
  return iterable => new TakeWhileIterator(iterable, predicate);
}
