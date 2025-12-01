import {
  OperationFunction,
  PredicateFunction,
  TypeGuardFunction,
} from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";

export class FilterIterator<T, TOfType extends T = T>
  implements Iterator<TOfType>
{
  index = 0;

  constructor(
    protected iterator: Iterator<T>,
    private predicate: PredicateFunction<T> | TypeGuardFunction<T, TOfType>,
  ) {}

  next(): IteratorResult<TOfType> {
    for (
      let { done, value } = this.iterator.next();
      !done;
      { done, value } = this.iterator.next()
    ) {
      if (this.predicate(value, this.index++)) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/**
 * Returns a Stream that yields elements from the source that satisfy the predicate.
 * @param predicate Predicate to filter elements.
 * @typeParam T Type of items in the source.
 * @returns Operation that yields elements from the source that satisfy the predicate.
 *
 * @example
 * ```typescript
 * const result = filter((x) => x % 2 === 0)([1, 2, 3, 4, 5]);
 * console.log([...result]); // [2, 4]
 * ```
 */
export function filter<T, TOfType extends T = T>(
  predicate: PredicateFunction<T> | TypeGuardFunction<T, TOfType>,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new FilterIterator(iterator, predicate),
  );
}
