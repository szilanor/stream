import type {
  CollectorFunction,
  ReduceFunction,
  ValueOrFactory,
} from "~/types";
import { callValueOrFactory } from "~/utils";

/**
 * Returns the result of applying the reducer function to each element of the source.
 * @param reducerFunction Reducer function to apply to each element.
 * @param initialValue Initial value or factory function to use as the first argument to the reducer function.
 * @typeParam T Type of items in the source.
 * @typeParam O Type of the result.
 * @returns Collector that returns the result of applying the reducer function to each element of the source.
 *
 * @example
 * ```typescript
 * const result = reduce<number, number>((prev, curr) => prev + curr, 0)([1, 2, 3]);
 * console.log(result); // 6
 * ```
 */
export function reduce<T, O>(
  reducerFunction: ReduceFunction<T, O>,
  initialValue: ValueOrFactory<O>,
): CollectorFunction<T, O> {
  return (source) => {
    let prev = callValueOrFactory(initialValue);
    let index = 0;
    for (const entry of source) {
      prev = reducerFunction(prev, entry, index++);
    }
    return prev;
  };
}
