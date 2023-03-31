import {OperationFunction} from '../../types';
import {doneResult, valueResult, wrap} from '../../utils';

class FlatIterator<T> implements Iterator<T> {
  private current: Iterator<T> | null = null;

  constructor(private readonly iterator: Iterator<Iterable<T>>) {}

  next(): IteratorResult<T> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.current) {
        const {value, done} = this.current.next();
        if (!done) {
          return valueResult(value);
        }
        this.current = null;
      }

      const {value, done} = this.iterator.next();
      if (done) {
        return doneResult();
      }

      this.current = value[Symbol.iterator]();
    }
  }
}

/** Returns an Iterable that yields the inner entries of array entries of the source Iterable. */
export function flat<T>(): OperationFunction<Iterable<T>, T> {
  return wrap(iterator => new FlatIterator(iterator));
}

export const flatten = flat;
