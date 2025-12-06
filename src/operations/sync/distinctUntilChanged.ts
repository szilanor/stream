import { OperationFunction, EqualsFunction } from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";

class DistinctUntilChangedIterator<T> implements Iterator<T> {
  private previous?: T;

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
      if (!this.previous || !this.equalsFunction(value, this.previous)) {
        this.previous = value;
        return valueResult(value);
      }
    }
    this.previous = undefined;
    return doneResult();
  }
}

/**
 * Returns an OperationFunction that yields elements from the source that are distinct from the previous element.
 * @param equalsFunction Function to compare elements.
 * @typeParam T Type of items in the source.
 * @returns An OperationFunction that yields elements from the source that are distinct from the previous element.
 *
 * @example
 * ```typescript
 * const result = distinctUntilChanged<number>()([1, 1, 2, 2, 3, 3]);
 * console.log([...result]); // [1, 2, 3]
 * ```
 */
export function distinctUntilChanged<T>(
  equalsFunction?: EqualsFunction<T>,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new DistinctUntilChangedIterator(iterator, equalsFunction),
  );
}
