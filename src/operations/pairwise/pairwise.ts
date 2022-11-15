import {IterableIteratorBase, OperationFunction} from '../../types';

export class PairwiseIterator<T> extends IterableIteratorBase<T, [T, T]> {
  private prev: T | undefined;

  constructor(iterable: Iterable<T>) {
    super(iterable);
  }

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
    return this.doneResult();
  }
}

/** Returns an Iterable that yields the current and the previous entry of the source Iterable. */
export function pairwise<T>(): OperationFunction<T, [T, T]> {
  return iterable => new PairwiseIterator(iterable);
}
