import {Stream} from '../../stream';

export class ConcatIterator<T> implements IterableIterator<T> {
  private index = 0;

  constructor(private iterators: Iterator<T>[]) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    while (this.index < this.iterators.length) {
      const iterator = this.iterators[this.index];
      const {value, done} = iterator.next();
      if (done) {
        this.index++;
      } else {
        return {done: false, value: value};
      }
    }
    return {done: true, value: undefined as unknown};
  }
}

/**
 * Returns a Stream that yields elements of all Iterable parameters in order.
 */
export function concat<T>(...iterables: Iterable<T>[]): Stream<T> {
  return new Stream<T>(
    new ConcatIterator(iterables.map(iterable => iterable[Symbol.iterator]()))
  );
}
