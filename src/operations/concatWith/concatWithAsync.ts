import { AsyncOperationFunction } from "../../types";
import { concatAsync } from "../../creators";

/** Concatenates the Iterable with other Iterables in order */
export function concatWithAsync<T>(
  ...iterables: Array<AsyncIterable<T> | Iterable<T>>
): AsyncOperationFunction<T, T> {
  return (iterable) => concatAsync(iterable, ...iterables);
}
