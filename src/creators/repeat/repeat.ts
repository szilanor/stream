import { Stream } from "../../stream";
import {
  doneResult,
  fromIteratorFactory,
  isFunction,
  valueResult,
} from "../../utils";

class RepeatIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(
    private value: T | (() => T),
    private times: number,
  ) {}

  next(): IteratorResult<T> {
    this.index++;
    return this.index <= this.times
      ? valueResult(isFunction(this.value) ? this.value() : this.value)
      : doneResult();
  }
}

/**
 * Returns a Stream that yields the value a specified number
 * of times, or indefinitely if the 'times' parameter is omitted.
 */
export function repeat<T>(
  value: T | (() => T),
  times: number = Number.POSITIVE_INFINITY,
): Stream<T> {
  return new Stream<T>(
    fromIteratorFactory(() => new RepeatIterator(value, times)),
  );
}
