import {IterableIteratorBase, OperationFunction} from '../../types';

export class DistinctIterator<T> extends IterableIteratorBase<T> {
  private items: Set<T> = new Set<T>();

  constructor(iterable: Iterable<T>) {
    super(iterable);
  }

  next(): IteratorResult<T> {
    for (
      let {value, done} = this.iterator.next();
      !done;
      {value, done} = this.iterator.next()
    ) {
      if (!this.items.has(value)) {
        this.items.add(value);
        return {done, value};
      }
    }
    this.items.clear();
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinct<T>(): OperationFunction<T, T> {
  return iterable => new DistinctIterator(iterable);
}
