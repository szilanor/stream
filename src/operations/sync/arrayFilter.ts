import { OperationFunction } from "~/types";

function* arrayFilterGenerator<T>(
  source: Iterable<T[]>,
  predicate: (entry: T, index: number) => boolean,
) {
  for (const entry of source) {
    yield entry.filter(predicate);
  }
}

/**
 * Returns an OperationFunction that yields only array entries of the source Iterable that satisfy the function.
 * @param predicate The function to use to filter the entries.
 * @typeParam T The type of the elements in the source Iterable.
 * @returns An OperationFunction that yields only array entries of the source Iterable that satisfy the function.
 *
 * @example
 * ```typescript
 * const result = arrayFilter<number>([1, 2, 3], (value) => value < 2);
 * console.log(result); // [1]
 * ```
 */
export function arrayFilter<T>(
  predicate: (entry: T, index: number) => boolean,
): OperationFunction<T[], T[]> {
  return (source) => arrayFilterGenerator(source, predicate);
}
