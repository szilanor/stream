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

/** Returns an Iterable that yields only entries of the source Iterable that satisfy the function. */
export function filterAsync<T>(
  predicate: PredicateFunction<T>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new FilterAsyncIterator(iterator, predicate),
  );
}
