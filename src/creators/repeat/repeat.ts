import {Stream} from '../../stream';
import {fromIterator, isFunction} from '../../utils';

export class RepeatIterator<T> implements IterableIterator<T> {
  private index = 0;

  constructor(private value: T | (() => T), private times: number) {}

  next(): IteratorResult<T> {
    this.index++;
    return this.index <= this.times
      ? {done: false, value: isFunction(this.value) ? this.value() : this.value}
      : {done: true, value: undefined as unknown};
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }
}

/**
 * Returns a Stream that yields the value a specified number
 * of times, or indefinitely if the 'times' parameter is omitted.
 */
export function repeat<T>(
  value: T | (() => T),
  times: number = Number.POSITIVE_INFINITY
): Stream<T> {
  return new Stream<T>(fromIterator(() => new RepeatIterator(value, times)));
}
