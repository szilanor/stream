import { OperationFunction } from "../../types";
import { concat } from "../../creators";

/** Concatenates the Iterable with other Iterables in order */
export function appendWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return (iterable) => concat(...iterables, iterable);
}
