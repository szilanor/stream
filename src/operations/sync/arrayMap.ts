import { OperationFunction } from "~/types";

function* arrayMapGenerator<T, O>(
  source: Iterable<T[]>,
  mapper: (entry: T, index: number) => O,
) {
  for (const entry of source) {
    yield entry.map(mapper);
  }
}

/** Returns an Iterable that yields array entries of the source Iterable transformed using the function */
export function arrayMap<T, O>(
  mapper: (entry: T, index: number) => O,
): OperationFunction<T[], O[]> {
  return (source) => arrayMapGenerator(source, mapper);
}
