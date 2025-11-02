import { OperationFunction } from "../../types";
import { doneResult, fromIteratorMapper, valueResult } from "../../utils";

class PairwiseIterator<T> implements Iterator<[T, T]> {
  private prev: T | undefined;

  constructor(private iterator: Iterator<T>) {}

  next(): IteratorResult<[T, T]> {
    for (
      let { done, value } = this.iterator.next();
      !done;
      { done, value } = this.iterator.next()
    ) {
      if (this.prev) {
        const result: IteratorResult<[T, T]> = valueResult([this.prev, value]);
        this.prev = value;
        return result;
      }
      this.prev = value;
    }
    return doneResult();
  }
}

/**
 * Returns a Stream that yields pairs of consecutive elements from the source.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields pairs of consecutive elements from the source.
 *
 * @example
 * ```typescript
 * const result = pairwise<number>()([1, 2, 3, 4]);
 * console.log([...result]); // [[1, 2], [2, 3], [3, 4]]
 * ```
 */
export function pairwise<T>(): OperationFunction<T, [T, T]> {
  return fromIteratorMapper((iterator) => new PairwiseIterator(iterator));
}
