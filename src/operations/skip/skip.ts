import {OperationFunction} from '../../types';

export class SkipIterator<T> implements IterableIterator<T> {
  private index = 0;

  constructor(private iterator: Iterator<T>, private count: number) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (this.index++ >= this.count) {
        return {done: false, value: item.value};
      }
    }
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable skipping the given amount of entries of the source Iterable. */
export function skip<T>(count: number): OperationFunction<T, T> {
  return entries => new SkipIterator(entries[Symbol.iterator](), count);
}
