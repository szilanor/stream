import type {
  AsyncCollectorFunction,
  AsyncReduceFunction,
  ValueOrFactory,
} from "~/types";
import { callValueOrFactory } from "~/utils";

/**
 * Returns a collector that returns a single output value by executing a reducer function on each entry of the Iterable.
 * @param reducerFunction A function that defines the sort order of the elements.
 * @param initialValue The initial value to use as the first argument to the reducer function.
 * @typeParam T Type of items in the source.
 * @typeParam O Type of the output value.
 * @returns Collector that returns a single output value by executing a reducer function on each entry of the Iterable.
 *
 * @example
 * ```typescript
 * const result = reduceAsync((a, b) => a + b, 0)([1, 2, 3]);
 * console.log(result); // 6
 * ```
 */
export function reduceAsync<T, O>(
  reducerFunction: AsyncReduceFunction<T, O>,
  initialValue: ValueOrFactory<O>,
): AsyncCollectorFunction<T, O> {
  return async (stream) => {
    let prev = callValueOrFactory(initialValue);
    let index = 0;
    for await (const entry of stream) {
      prev = await reducerFunction(prev, entry, index++);
    }
    return prev;
  };
}
