import {Stream} from '../../stream';

export class RangeIterator implements IterableIterator<number> {
  private index = 0;

  constructor(private start: number, private count: number, private by = 1) {}

  [Symbol.iterator](): IterableIterator<number> {
    return this;
  }

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
  return new Stream<number>(new RangeIterator(start, count, by));
}
