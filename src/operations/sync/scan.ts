import { OperationFunction, ReduceFunction, ValueOrFactory } from "~/types";
import { doneResult, fromIteratorMapper, valueResult } from "~/utils";
import { callValueOrFactory } from "~/utils";

class ScanIterator<T, O> implements Iterator<O> {
  private accumulator: O;
  private index = 0;

  constructor(
    private readonly iterator: Iterator<T>,
    private readonly reducerFunction: ReduceFunction<T, O>,
    private readonly initialValue: ValueOrFactory<O>,
  ) {
    this.accumulator = callValueOrFactory(this.initialValue);
  }

  next(): IteratorResult<O> {
    const { done, value } = this.iterator.next();
    if (done) {
      return doneResult();
    }
    this.accumulator = this.reducerFunction(
      this.accumulator,
      value,
      this.index++,
    );
    return valueResult(this.accumulator);
  }
}

/**
 * Returns an OperationFunction that yields the result of applying the reducer function to each element of the source.
 * @typeParam T Type of items in the source.
 * @typeParam O Type of items to yield.
 * @param reducerFunction A function that reduces the source to a single value.
 * @param initialValue Initial value or factory function to use as the first argument to the reducer function.
 * @returns An OperationFunction that yields the result of applying the reducer function to each element of the source.
 *
 * @example
 * ```typescript
 * const result = scan<number, number>((prev, curr) => prev + curr, 0)([1, 2, 3]);
 * console.log([...result]); // [1, 3, 6]
 * ```
 */
export function scan<T, O>(
  reducerFunction: ReduceFunction<T, O>,
  initialValue: ValueOrFactory<O>,
): OperationFunction<T, O> {
  return fromIteratorMapper(
    (iterator) => new ScanIterator(iterator, reducerFunction, initialValue),
  );
}
