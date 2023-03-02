import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';

class MapIterator<T, O> implements Iterator<O> {
  index = 0;
  constructor(
    protected iterator: Iterator<T>,
    private mapper: (value: T, index: number) => O
  ) {}

  next(): IteratorResult<O> {
    const {value, done} = this.iterator.next();
    return done ? doneResult() : valueResult(this.mapper(value, this.index++));
  }
}

/** Returns an Iterable that yields entries of the source Iterable transformed using the function */
export function map<T, O>(
  mapper: (value: T, index: number) => O
): OperationFunction<T, O> {
  return wrap(iterator => new MapIterator(iterator, mapper));
}
