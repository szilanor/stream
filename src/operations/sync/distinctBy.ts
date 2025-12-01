import { OperationFunction, EqualsFunction } from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";

class DistinctByIterator<T> implements Iterator<T> {
  private items: Array<T> = new Array<T>();

  constructor(
    private iterator: Iterator<T>,
    private equalsFunction: EqualsFunction<T> = (a, b) => a === b,
  ) {}

  next(): IteratorResult<T> {
    for (
      let { value, done } = this.iterator.next();
      !done;
      { value, done } = this.iterator.next()
    ) {
      if (
        this.items.findIndex((cached) => this.equalsFunction(cached, value)) ===
        -1
      ) {
        this.items.push(value);
        return valueResult(value);
      }
    }

    this.items = [];
    return doneResult();
  }
}

/**
 * Returns a Stream that yields distinct elements from the source based on the equals function.
 * @param equalsFunction Function to compare elements.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields distinct elements from the source.
 *
 * @example
 * ```typescript
 * const result = distinctBy<number>((a, b) => a % 2 === b % 2)([1, 2, 1, 3, 2, 4]);
 * console.log([...result]); // [1, 2]
 * ```
 */
export function distinctBy<T>(
  equalsFunction: EqualsFunction<T> = (a, b) => a === b,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new DistinctByIterator(iterator, equalsFunction),
  );
}
