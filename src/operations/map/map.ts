import {IndexedIteratorBase, OperationFunction} from '../../types';
import {mapIterator} from '../../utils';

export class MapIterator<T, O> extends IndexedIteratorBase<T, O> {
  constructor(
    protected iterator: Iterator<T>,
    private mapper: (value: T, index: number) => O
  ) {
    super(iterator);
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
  mapper: (value: T, index: number) => O
): OperationFunction<T, O> {
  return mapIterator(iterator => new MapIterator(iterator, mapper));
}
