import {IndexedIterableIteratorBase, OperationFunction} from '../../types';

export class MapIterator<T, O> extends IndexedIterableIteratorBase<T, O> {
  constructor(
    iterable: Iterable<T>,
    private mapper: (value: T, index: number) => O
  ) {
    super(iterable);
  }

  next(): IteratorResult<O> {
    const {value, done} = this.iterator.next();
    return done
      ? this.doneResult()
      : this.valueResult(this.mapper(value, this.index++));
  }
}

/** Returns an Iterable that yields entries of the source Iterable transformed using the function */
export function map<T, O>(
  func: (value: T, index: number) => O
): OperationFunction<T, O> {
  return iterable => new MapIterator(iterable, func);
}
