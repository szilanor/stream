import {OperationFunction} from '../../types';

export class DistinctIterator<T> implements IterableIterator<T> {
  private set: Set<T> = new Set<T>();

  constructor(private iterator: Iterator<T>) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (!this.set.has(item.value)) {
        this.set.add(item.value);
        return {done: item.done, value: item.value};
      }
    }
    this.set.clear();
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinct<T>(): OperationFunction<T, T> {
  return entries => new DistinctIterator(entries[Symbol.iterator]());
}
