import { OperationFunction } from "../../types";
import { concat } from "../../creators";

/** Concatenates the Iterable with other Iterables in order */
export function concatWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return (iterable) => concat(iterable, ...iterables);
}
