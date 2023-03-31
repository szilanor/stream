import {Stream} from '../../stream';
import {doneResult, fromIteratorFactory, valueResult} from '../../utils';

class RangeIterator implements Iterator<number> {
  private index = 0;

  constructor(private start: number, private count: number, private by = 1) {}

  next(): IteratorResult<number> {
    return this.index < this.count
      ? valueResult(this.start + this.index++ * this.by)
      : doneResult();
  }
}

/**
 * Returns a Stream that yields a range of values.
 */
export function range(start: number, count: number, by = 1): Stream<number> {
  return new Stream<number>(
    fromIteratorFactory(() => new RangeIterator(start, count, by))
  );
}
