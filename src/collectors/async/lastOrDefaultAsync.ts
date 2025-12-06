import type {
  AsyncCollectorFunction,
  MaybeAsyncPredicateFunction,
  ValueOrFactory,
} from "~/types";
import { callValueOrFactory } from "~/utils";
import { lastAsync } from "./lastAsync";

/**
 * Returns a collector that returns the last entry from the Iterable that satisfies the 'predicate' function or the 'defaultValue'.
 * @param defaultValue Default value to return if no entry satisfies the 'predicate' function.
 * @param predicate A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the last entry from the Iterable that satisfies the 'predicate' function or the 'defaultValue'.
 *
 * @example
 * ```typescript
 * const result = lastOrDefaultAsync(2)([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function lastOrDefaultAsync<T>(
  defaultValue: ValueOrFactory<T>,
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, T | undefined> {
  return async (source) =>
    (await lastAsync(predicate)(source)) ?? callValueOrFactory(defaultValue);
}

export const findLastOrDefaultAsync = lastOrDefaultAsync;
