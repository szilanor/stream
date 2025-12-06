import {
  AsyncOperationFunction,
  PredicateFunction,
  TypeGuardFunction,
} from "~/types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";

export class FilterAsyncIterator<T, TOfType extends T = T>
  implements AsyncIterator<TOfType>
{
  index = 0;

  constructor(
    private iterator: AsyncIterator<T>,
    private predicate: PredicateFunction<T> | TypeGuardFunction<T, TOfType>,
  ) {}

  async next(): Promise<IteratorResult<TOfType>> {
    for (
      let { done, value } = await this.iterator.next();
      !done;
      { done, value } = await this.iterator.next()
    ) {
      if (this.predicate(value, this.index++)) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/**
 * Returns an AsyncOperationFunction that yields only entries of the source Iterable that satisfy the function.
 * @param predicate The function to use to filter the entries.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An AsyncOperationFunction that yields only entries of the source Iterable that satisfy the function.
 *
 * @example
 * ```typescript
 * const result = filterAsync<number>([1, 2, 3], (value) => value > 1);
 * console.log(result); // [2, 3]
 * ```
 */
export function filterAsync<T>(
  predicate: PredicateFunction<T>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new FilterAsyncIterator(iterator, predicate),
  );
}
