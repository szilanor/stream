import {Stream} from '../../stream';

export class RepeatIterator<T> implements IterableIterator<T> {
  private index = 0;

  constructor(private value: T, private times: number) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    this.index++;
    return this.index <= this.times
      ? {done: false, value: this.value}
      : {done: true, value: undefined as unknown};
  }
}

/**
 * Returns a Stream that yields the value a specified number
 * of times, or indefinitely if the 'times' parameter is omitted.
 */
export function repeat<T>(
  value: T,
  times: number = Number.POSITIVE_INFINITY
): Stream<T> {
  return new Stream<T>(new RepeatIterator(value, times));
}
