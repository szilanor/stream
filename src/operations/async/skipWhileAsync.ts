import {
  doneResult,
  fromAsyncIteratorMapper,
  valueResult,
} from "~/utils";
import { AsyncOperationFunction, PredicateFunction } from "~/types";

class SkipWhileAsyncIterator<T> implements AsyncIterator<T> {
  index = 0;
  private skip = true;

  constructor(
    private iterator: AsyncIterator<T>,
    private predicate: PredicateFunction<T>,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let { done, value } = await this.iterator.next();
      !done;
      { done, value } = await this.iterator.next()
    ) {
      if (this.skip && (this.skip = this.predicate(value, this.index++)))
        continue;
      return valueResult(value);
    }
    return doneResult();
  }
}

/** Returns an Iterable skipping entries of the source Iterable while the parameter function returns true. */
export function skipWhileAsync<T>(
  predicate: PredicateFunction<T>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new SkipWhileAsyncIterator(iterator, predicate),
  );
}
