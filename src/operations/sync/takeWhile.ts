import { OperationFunction, PredicateFunction } from "~/types";
import { fromIteratorMapper } from "~/utils";

class TakeWhileIterator<T> implements Iterator<T> {
  index = 0;

  constructor(
    private iterator: Iterator<T>,
    private predicate: PredicateFunction<T>,
  ) {}

  next(): IteratorResult<T> {
    const { done, value } = this.iterator.next();
    return { done: done || !this.predicate(value, this.index++), value };
  }
}

/**
 * Returns an OperationFunction that takes elements from the source while the predicate returns `true`.
 * @param predicate Predicate function to determine if an element should be taken.
 * @typeParam T Type of items in the source.
 * @returns An OperationFunction that takes elements from the source while the predicate returns `true`.
 *
 * @example
 * ```typescript
 * const result = takeWhile<number>((x) => x < 3)([1, 2, 3, 4]);
 * console.log([...result]); // [1, 2]
 * ```
 */
export function takeWhile<T>(
  predicate: PredicateFunction<T>,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new TakeWhileIterator(iterator, predicate),
  );
}
