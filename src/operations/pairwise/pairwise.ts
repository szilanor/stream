import {OperationFunction} from '../../types';
import {doneResult, fromIteratorMapper, valueResult} from '../../utils';

export class PairwiseIterator<T> implements Iterator<[T, T]> {
  private prev: T | undefined;

  constructor(private iterator: Iterator<T>) {}

  next(): IteratorResult<[T, T]> {
    for (
      let {done, value} = this.iterator.next();
      !done;
      {done, value} = this.iterator.next()
    ) {
      if (this.prev) {
        const result: IteratorResult<[T, T]> = valueResult([this.prev, value]);
        this.prev = value;
        return result;
      }
      this.prev = value;
    }
    return doneResult();
  }
}

/** Returns an Iterable that yields the current and the previous entry of the source Iterable. */
export function pairwise<T>(): OperationFunction<T, [T, T]> {
  return fromIteratorMapper(iterator => new PairwiseIterator(iterator));
}
