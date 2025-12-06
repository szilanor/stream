import type {
  AsyncCollectorFunction,
  MaybeAsyncPredicateFunction,
  ValueOrFactory,
} from "~/types";
import { callValueOrFactory } from "~/utils";
import { firstAsync } from "./firstAsync";

/**
 * Returns a collector that returns the first entry from the Iterable that satisfies the 'predicate' function or the 'defaultValue'.
 * @param defaultValue Default value to return if no entry satisfies the 'predicate' function.
 * @param predicate A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the first entry from the Iterable that satisfies the 'predicate' function or the 'defaultValue'.
 *
 * @example
 * ```typescript
 * const result = firstOrDefaultAsync(2)([1, 2, 3]);
 * console.log(result); // 2
 * ```
 */
export function firstOrDefaultAsync<T>(
  defaultValue: ValueOrFactory<T>,
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, T> {
  return async (source) =>
    (await firstAsync(predicate)(source)) ?? callValueOrFactory(defaultValue);
}

export const findOrDefaultAsync = firstOrDefaultAsync;
