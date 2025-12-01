import { Stream } from "~/stream";
import {
  callValueOrFactory,
  doneResult,
  fromIteratorFactory,
  valueResult,
} from "~/utils";
import { ValueOrFactory } from "~/types";

class RepeatIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(
    private value: ValueOrFactory<T>,
    private times: number,
  ) {}

  next(): IteratorResult<T> {
    this.index++;
    return this.index <= this.times
      ? valueResult(callValueOrFactory(this.value))
      : doneResult();
  }
}

/**
 * Returns a Stream that yields the same value 'times' number of times.
 * @param value Value to repeat.
 * @param times Number of times to repeat the value.
 * @typeParam T Type of the value.
 * @returns A Stream that yields the value 'times' number of times.
 *
 * @example
 * ```typescript
 * const result = repeat('A', 3);
 * console.log([...result]); // ['A', 'A', 'A']
 * ```
 */
export function repeat<T>(
  value: ValueOrFactory<T>,
  times: number = Number.POSITIVE_INFINITY,
): Stream<T> {
  return new Stream<T>(
    fromIteratorFactory(() => new RepeatIterator(value, times)),
  );
}
