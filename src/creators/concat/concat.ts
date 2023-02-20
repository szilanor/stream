import {Stream} from '../../stream';
import {doneResult, valueResult} from '../../utils';

class ConcatIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(private iterators: Iterator<T>[]) {}

  next(): IteratorResult<T> {
    while (this.index < this.iterators.length) {
      const iterator = this.iterators[this.index];
      const {value, done} = iterator.next();
      if (done) {
        this.index++;
      } else {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

export class ConcatIterable<T> implements Iterable<T> {
  constructor(private iterables: Iterable<T>[]) {}

  [Symbol.iterator](): Iterator<T> {
    return new ConcatIterator(
      this.iterables.map(iterable => iterable[Symbol.iterator]())
    );
  }
}

/**
 * Returns a Stream that yields elements of all Iterable parameters in order.
 */
export function concat<T>(...iterables: Iterable<T>[]): Stream<T> {
  return new Stream<T>(new ConcatIterable(iterables));
}
