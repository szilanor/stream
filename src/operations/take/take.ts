import { OperationFunction } from "../../types";
import { doneResult, fromIteratorMapper, valueResult } from "../../utils";

class TakeIterator<T> implements Iterator<T> {
  index = 0;

  constructor(
    private iterator: Iterator<T>,
    private count: number,
  ) {}

  next(): IteratorResult<T> {
    const { done, value } = this.iterator.next();
    if (done || this.index++ >= this.count) {
      return doneResult();
    }
    return valueResult(value);
  }
}

/**
 * Takes the first `count` elements from the source.
 * @param count Number of elements to take.
 * @typeParam T Type of items in the source.
 * @returns Operation that takes the first `count` elements from the source.
 *
 * @example
 * ```typescript
 * const result = take<number>(2)([1, 2, 3, 4]);
 * console.log([...result]); // [1, 2]
 * ```
 */
export function take<T>(count: number): OperationFunction<T, T> {
  return fromIteratorMapper((iterator) => new TakeIterator(iterator, count));
}
