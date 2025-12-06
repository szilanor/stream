import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";
import {
  AsyncOperationFunction,
  AsyncMapperFunction,
  MapperFunction,
} from "~/types";

class MapAsyncIterator<T, O> implements AsyncIterator<O> {
  index = 0;

  constructor(
    protected iterator: AsyncIterator<T>,
    private mapper: MapperFunction<T, O> | AsyncMapperFunction<T, O>,
  ) {}

  async next(): Promise<IteratorResult<O>> {
    const { value, done } = await this.iterator.next();
    return done
      ? doneResult()
      : valueResult(await this.mapper(value, this.index++));
  }
}

/**
 * Returns an AsyncOperationFunction that yields entries of the source Iterable transformed using the function.
 * @param mapper The function to use to map the entries.
 * @typeParam T The type of the elements in the source Iterable.
 * @typeParam O The type of the elements in the result Iterable.
 * @returns An AsyncOperationFunction that yields entries of the source Iterable transformed using the function.
 *
 * @example
 * ```typescript
 * const result = mapAsync<number, number>([1, 2, 3], (value) => value * 2);
 * console.log(result); // [2, 4, 6]
 * ```
 */
export function mapAsync<T, O>(
  mapper: MapperFunction<T, O> | AsyncMapperFunction<T, O>,
): AsyncOperationFunction<T, O> {
  return fromAsyncIteratorMapper(
    (iterator) => new MapAsyncIterator(iterator, mapper),
  );
}
