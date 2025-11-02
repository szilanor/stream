import { Stream } from "../../stream";
import { doneResult, fromIteratorFactory, valueResult } from "../../utils";

class RangeIterator implements Iterator<number> {
  private index = 0;

  constructor(
    private start: number,
    private count: number,
    private by = 1,
  ) {}

  next(): IteratorResult<number> {
    return this.index < this.count
      ? valueResult(this.start + this.index++ * this.by)
      : doneResult();
  }
}

/**
 * Returns a Stream that yields numbers starting from 'start' up to 'start + count - 1'.
 * @param start The first number in the range.
 * @param count The number of elements in the range.
 * @param by The step between elements.
 * @returns A Stream that yields numbers in the range.
 *
 * @example
 * ```typescript
 * const result = range(1, 5, 2);
 * console.log([...result]); // [1, 3, 5]
 * ```
 */
export function range(start: number, count: number, by = 1): Stream<number> {
  return new Stream<number>(
    fromIteratorFactory(() => new RangeIterator(start, count, by)),
  );
}
