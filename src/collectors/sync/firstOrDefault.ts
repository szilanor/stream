import type {
  CollectorFunction,
  PredicateFunction,
  ValueOrFactory,
} from "~/types";
import { first } from "./first";
import { callValueOrFactory } from "~/utils";

/**
 * Returns the first element in the source that satisfies the predicate or a default value.
 * @param defaultValue Default value or factory to use if no element satisfies the predicate.
 * @param predicate Predicate function to determine if an element should be returned.
 * @typeParam T Type of items in the source.
 * @returns Collector that returns the first element in the source that satisfies the predicate or a default value.
 *
 * @example
 * ```typescript
 * const result = firstOrDefault<number>(0, (x) => x > 1)([1, 2, 3]);
 * console.log(result); // 2
 * ```
 */
export function firstOrDefault<T>(
  defaultValue: ValueOrFactory<T>,
  predicate: PredicateFunction<T> = () => true,
): CollectorFunction<T, T> {
  return (source) =>
    first<T>(predicate)(source) ?? callValueOrFactory(defaultValue);
}

export const findOrDefault = firstOrDefault;
