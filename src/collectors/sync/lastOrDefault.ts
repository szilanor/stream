import type {
  CollectorFunction,
  PredicateFunction,
  ValueOrFactory,
} from "~/types";
import { last } from "./last";
import { callValueOrFactory } from "~/utils";

/**
 * Returns a collector that returns the last element in the source that satisfies the predicate or a default value if no such element is found.
 * @param defaultValue Default value to return if no element is found.
 * @param predicate Predicate function to determine if an element should be returned.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the last element in the source that satisfies the predicate or a default value if no such element is found.
 *
 * @example
 * ```typescript
 * const result = lastOrDefault<number>(0, (x) => x > 1)([1, 2, 3]);
 * console.log(result); // 3
 * ```
 */
export function lastOrDefault<T>(
  defaultValue: ValueOrFactory<T>,
  predicate: PredicateFunction<T> = () => true,
): CollectorFunction<T, T | undefined> {
  return (source) =>
    last(predicate)(source) ?? callValueOrFactory(defaultValue);
}

export const findLastOrDefault = lastOrDefault;
