import { OperationFunction } from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";

class SkipIterator<T> implements Iterator<T> {
  index = 0;

  constructor(
    private iterator: Iterator<T>,
    private count: number,
  ) {}

  next(): IteratorResult<T> {
    for (
      let { done, value } = this.iterator.next();
      !done;
      { done, value } = this.iterator.next()
    ) {
      if (this.index++ >= this.count) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/**
 * Returns an OperationFunction that skips the first `count` elements from the source.
 * @param count Number of elements to skip.
 * @typeParam T Type of items in the source.
 * @returns An OperationFunction that skips the first `count` elements from the source.
 *
 * @example
 * ```typescript
 * const result = skip<number>(2)([1, 2, 3, 4]);
 * console.log([...result]); // [3, 4]
 * ```
 */
export function skip<T>(count: number): OperationFunction<T, T> {
  return fromIteratorMapper((iterator) => new SkipIterator(iterator, count));
}
