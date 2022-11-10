import {Stream} from '../../stream';
import {fromIterator} from '../../utils';

export class RangeIterator implements Iterator<number> {
  private index = 0;

  constructor(private start: number, private count: number, private by = 1) {}

  next(): IteratorResult<number> {
    return this.index < this.count
      ? {done: false, value: this.start + this.index++ * this.by}
      : {done: true, value: undefined as unknown};
  }
}

/**
 * Returns a Stream that yields a range of values.
 */
export function range(start: number, count: number, by = 1): Stream<number> {
  return new Stream<number>(
    fromIterator(() => new RangeIterator(start, count, by))
  );
}
