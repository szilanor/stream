import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class FilterIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(
    private iterator: Iterator<T>,
    private predicate: (value: T, index: number) => boolean
  ) {}

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
  return operationFunctionFactory(
    iterator => new FilterIterator(iterator, func)
  );
}
