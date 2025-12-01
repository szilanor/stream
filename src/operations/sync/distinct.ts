import { OperationFunction } from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";

class DistinctIterator<T> implements Iterator<T> {
  private items: Set<T> = new Set<T>();

  constructor(protected iterator: Iterator<T>) {}

  next(): IteratorResult<T> {
    for (
      let { value, done } = this.iterator.next();
      !done;
      { value, done } = this.iterator.next()
    ) {
      if (!this.items.has(value)) {
        this.items.add(value);
        return valueResult(value);
      }
    }
    this.items.clear();
    return doneResult();
  }
}

/**
 * Returns a Stream that yields distinct elements from the source.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields distinct elements from the source.
 *
 * @example
 * ```typescript
 * const result = distinct()([1, 2, 1, 3, 2, 4]);
 * console.log([...result]); // [1, 2, 3, 4]
 * ```
 */
export function distinct<T>(): OperationFunction<T, T> {
  return fromIteratorMapper((iterator) => new DistinctIterator(iterator));
}
