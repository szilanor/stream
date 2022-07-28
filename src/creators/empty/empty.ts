import {Stream} from '../../stream';

export class EmptyIterator<T> implements IterableIterator<T> {
  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    return {done: true, value: undefined as unknown};
  }
}

/*
 * Creates a Stream that returns 0 entries
 */
export function empty<T>(): Stream<T> {
  return new Stream<T>(new EmptyIterator());
}
