import {
  AsyncReduceFunction,
  ValueOrFactory,
  AsyncOperationFunction,
} from "~/types";
import { doneResult, fromAsyncIteratorMapper, valueResult } from "~/utils";
import { callValueOrFactory } from "~/utils";

class ScanAsyncIterator<T, O> implements AsyncIterator<O> {
  private accumulator: O;
  private index = 0;

  constructor(
    private readonly iterator: AsyncIterator<T>,
    private readonly reducerFunction: AsyncReduceFunction<T, O>,
    private readonly initialValue: ValueOrFactory<O>,
  ) {
    this.accumulator = callValueOrFactory(this.initialValue);
  }

  async next(): Promise<IteratorResult<O>> {
    const { done, value } = await this.iterator.next();
    if (done) {
      return doneResult();
    }
    this.accumulator = await this.reducerFunction(
      this.accumulator,
      value,
      this.index++,
    );
    return valueResult(this.accumulator);
  }
}

/**
 * Returns a Stream that yields the result of applying the reducer function to each element of the source.
 * @typeParam T Type of items in the source.
 * @typeParam O Type of items to yield.
 * @param reducerFunction A function that reduces the source to a single value.
 * @param initialValue Initial value or factory function to use as the first argument to the reducer function.
 * @returns Operation that yields the result of applying the reducer function to each element of the source.
 *
 * @example
 * ```typescript
 * const result = scan<number, number>((prev, curr) => prev + curr, 0)([1, 2, 3]);
 * console.log([...result]); // [1, 3, 6]
 * ```
 */
export function scanAsync<T, O>(
  reducerFunction: AsyncReduceFunction<T, O>,
  initialValue: ValueOrFactory<O>,
): AsyncOperationFunction<T, O> {
  return fromAsyncIteratorMapper(
    (iterator) =>
      new ScanAsyncIterator(iterator, reducerFunction, initialValue),
  );
}
