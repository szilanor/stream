import { OperationFunction } from "../../types";
import {
  doneResult,
  fromIteratorMapper,
  PredicateFunction,
  valueResult,
} from "../../utils";

class SkipWhileIterator<T> implements Iterator<T> {
  index = 0;
  private skip = true;

  constructor(
    private iterator: Iterator<T>,
    private predicate: PredicateFunction<T>,
  ) {}

  next(): IteratorResult<T> {
    for (
      let { done, value } = this.iterator.next();
      !done;
      { done, value } = this.iterator.next()
    ) {
      if (this.skip && (this.skip = this.predicate(value, this.index++)))
        continue;
      return valueResult(value);
    }
    return doneResult();
  }
}

/**
 * Skips elements from the source while the predicate returns `true`.
 * @param predicate Predicate function to determine if an element should be skipped.
 * @typeParam T Type of items in the source.
 * @returns Operation that skips elements from the source while the predicate returns `true`.
 * 
 * @example
 * ```typescript
 * const result = skipWhile<number>((x) => x < 3)([1, 2, 3, 4]);
 * console.log([...result]); // [3, 4]
 * ```
 */
export function skipWhile<T>(
  predicate: PredicateFunction<T>,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new SkipWhileIterator(iterator, predicate),
  );
}
