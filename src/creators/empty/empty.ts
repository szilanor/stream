import {Stream} from '../../stream';
import {fromIterator} from '../../utils';

export class EmptyIterator<T> implements Iterator<T> {
  next(): IteratorResult<T> {
    return {done: true, value: undefined as unknown};
  }
}

/*
 * Creates a Stream that returns 0 entries
 */
export function empty<T>(): Stream<T> {
  return new Stream<T>(fromIterator(() => new EmptyIterator()));
}
