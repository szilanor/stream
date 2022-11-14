import {IndexedIterableIteratorBase, OperationFunction} from '../../types';

export class FilterIterator<T> extends IndexedIterableIteratorBase<T> {
  constructor(
    iterable: Iterable<T>,
    private predicate: (value: T, index: number) => boolean
  ) {
    super(iterable);
  }

  next(): IteratorResult<T> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (this.predicate(item.value, this.index++)) {
        return {done: false, value: item.value};
      }
    }
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields only entries of the source Iterable that satisfy the function. */
export function filter<T>(
  func: (value: T, index: number) => boolean
): OperationFunction<T, T> {
  return iterable => new FilterIterator(iterable, func);
}
