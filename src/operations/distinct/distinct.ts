import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class DistinctIterator<T> implements Iterator<T> {
  private items: Set<T> = new Set<T>();

  constructor(private iterator: Iterator<T>) {}

  next(): IteratorResult<T> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (!this.items.has(item.value)) {
        this.items.add(item.value);
        return {done: item.done, value: item.value};
      }
    }
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinct<T>(): OperationFunction<T, T> {
  return operationFunctionFactory(iterator => new DistinctIterator(iterator));
}
