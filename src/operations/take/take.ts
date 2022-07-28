import {OperationFunction} from '../../types';

export class TakeIterator<T> implements IterableIterator<T> {
  private index = 0;

  constructor(private iterator: Iterator<T>, private count: number) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    const item = this.iterator.next();
    return {done: item.done || this.index++ >= this.count, value: item.value};
  }
}

/** Returns an Iterable taking the given amount of entries of the source Iterable. */
export function take<T>(count: number): OperationFunction<T, T> {
  return entries => new TakeIterator(entries[Symbol.iterator](), count);
}
