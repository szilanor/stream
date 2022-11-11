import {OperationFunction} from '../../types';
import {operationFunctionFactory} from '../../utils';

export class PairwiseIterator<T> implements Iterator<[T, T]> {
  private prev: T | undefined;

  constructor(private iterator: Iterator<T>) {}

  next(): IteratorResult<[T, T]> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (this.prev) {
        const result: IteratorResult<[T, T]> = {
          done: false,
          value: [this.prev, item.value],
        };
        this.prev = item.value;
        return result;
      }
      this.prev = item.value;
    }
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields the current and the previous entry of the source Iterable. */
export function pairwise<T>(): OperationFunction<T, [T, T]> {
  return operationFunctionFactory(iterator => new PairwiseIterator(iterator));
}
