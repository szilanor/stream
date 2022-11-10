import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class MapIterator<T, O> implements Iterator<O> {
  private index = 0;

  constructor(
    private iterator: Iterator<T>,
    private mapper: (value: T, index: number) => O
  ) {}

  next(): IteratorResult<O> {
    const {value, done} = this.iterator.next();
    return done
      ? {done, value: undefined as unknown}
      : {done, value: this.mapper(value, this.index++)};
  }
}

/** Returns an Iterable that yields entries of the source Iterable transformed using the function */
export function map<T, O>(
  func: (value: T, index: number) => O
): OperationFunction<T, O> {
  return operationFunctionFactory(iterator => new MapIterator(iterator, func));
}
