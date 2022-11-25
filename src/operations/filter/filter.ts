import {IndexedIteratorBase, OperationFunction} from '../../types';
import {mapIterator} from '../../utils';

export class FilterIterator<T> extends IndexedIteratorBase<T> {
  constructor(
    protected iterator: Iterator<T>,
    private predicate: (value: T, index: number) => boolean
  ) {
    super(iterator);
  }

  next(): IteratorResult<T> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.predicate(value, this.index++)) {
        return this.valueResult(value);
      }
    }
    return this.doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable that satisfy the function. */
export function filter<T>(
  func: (value: T, index: number) => boolean
): OperationFunction<T, T> {
  return mapIterator(iterator => new FilterIterator(iterator, func));
}
