import {Stream} from '../../stream';
import {doneResult, fromIterator, valueResult} from '../../utils';

class ConcatIterator<T> implements Iterator<T> {
  private index = 0;
  private iterator: Iterator<T> | undefined;

  constructor(private iterables: Array<Iterable<T>>) {}

  next(): IteratorResult<T> {
    while (this.index < this.iterables.length) {
      this.iterator =
        this.iterator || this.iterables[this.index][Symbol.iterator]();
      const {value, done} = this.iterator.next();
      if (done) {
        this.index++;
        if (this.index < this.iterables.length) {
          this.iterator = this.iterables[this.index][Symbol.iterator]();
        }
      } else {
        return valueResult(value);
      }
    }
    this.iterator = undefined;
    return doneResult();
  }
}

/**
 * Returns a Stream that yields elements of all Iterable parameters in order.
 */
export function concat<T>(...iterables: Array<Iterable<T>>): Stream<T> {
  return new Stream<T>(fromIterator(() => new ConcatIterator(iterables)));
}
