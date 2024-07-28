import { Stream } from "../../stream";
import { doneResult, fromIteratorFactory, iter, valueResult } from "../../utils";

class ConcatIterator<T> implements Iterator<T> {
  private index = 0;
  private iterator: Iterator<T> | undefined;

  constructor(private iterables: Array<Iterable<T>>) { }

  next(): IteratorResult<T> {
    while (this.index < this.iterables.length) {
      this.iterator =
        this.iterator || iter(this.iterables[this.index]);
      const { value, done } = this.iterator.next();
      if (done) {
        this.index++;
        if (this.index < this.iterables.length) {
          this.iterator = iter(this.iterables[this.index]);
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
  * @param iterables Iterables to concatenate.
  * @typeParam T Type of items in the Iterables.
  * @returns Stream that yields elements of all Iterables in order.
  */
export function concat<T>(...iterables: Array<Iterable<T>>): Stream<T> {
  return new Stream<T>(
    fromIteratorFactory(() => new ConcatIterator(iterables)),
  );
}

export const chain = concat;