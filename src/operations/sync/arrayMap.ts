import { OperationFunction } from "~/types";

function* arrayMapGenerator<T, O>(
  source: Iterable<T[]>,
  mapper: (entry: T, index: number) => O,
) {
  for (const entry of source) {
    yield entry.map(mapper);
  }
}

/**
 * Returns an OperationFunction that yields array entries of the source Iterable transformed using the function.
 * @param mapper The function to use to transform the entries.
 * @typeParam T The type of the elements in the source Iterable.
 * @typeParam O The type of the elements in the transformed Iterable.
 * @returns An OperationFunction that yields array entries of the source Iterable transformed using the function.
 *
 * @example
 * ```typescript
 * const result = arrayMap<number, string>([1, 2, 3], (value) => value.toString());
 * console.log(result); // ["1", "2", "3"]
 * ```
 */
export function arrayMap<T, O>(
  mapper: (entry: T, index: number) => O,
): OperationFunction<T[], O[]> {
  return (source) => arrayMapGenerator(source, mapper);
}
