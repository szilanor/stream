import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class DistinctIterator<T> implements Iterator<T> {
  private items: Array<T> = new Array<T>();

  constructor(
    private iterator: Iterator<T>,
    private comparer: (a: T, b: T) => boolean = (a, b) => a === b
  ) {}

  next(): IteratorResult<T> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      let found = false;

      for (const cached of this.items) {
        found = this.comparer(cached, item.value);
      }

      if (!found) {
        this.items.push(item.value);
        return {done: item.done, value: item.value};
      }
    }

    this.items = [];
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinct<T>(
  comparer: (a: T, b: T) => boolean = (a, b) => a === b
): OperationFunction<T, T> {
  return operationFunctionFactory(
    iterator => new DistinctIterator(iterator, comparer)
  );
}
