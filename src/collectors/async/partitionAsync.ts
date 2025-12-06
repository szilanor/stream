import type {
  AsyncCollectorFunction,
  MaybeAsyncPredicateFunction,
} from "~/types";
import { reduceAsync } from "./reduceAsync";

/**
 * Returns a collector that partitions the entries in the Iterable into two arrays based on the predicate function.
 * @param predicate A function that tests each entry for a condition.
 * @typeParam T Type of items in the source.
 * @returns Collector that partitions the entries in the Iterable into two arrays based on the predicate function.
 *
 * @example
 * ```typescript
 * const result = partitionAsync((x) => x > 0)([1, 2, 3]);
 * console.log(result); // [[1, 2, 3], []]
 * ```
 */
export function partitionAsync<T>(
  predicate: MaybeAsyncPredicateFunction<T>,
): AsyncCollectorFunction<T, [T[], T[]]> {
  return reduceAsync(
    async (previous, current, index) => {
      if (await predicate(current, index)) {
        previous[0].push(current);
      } else {
        previous[1].push(current);
      }
      return previous;
    },
    () => [new Array<T>(), new Array<T>()],
  );
}
