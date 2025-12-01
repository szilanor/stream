import { AsyncOperationFunction } from "~/types";
import { concatAsync } from "~/creators/async/concatAsync";

/** Returns an Iterable with the entries of the source Iterable then the parameter value. */
export function endWithAsync<T>(...values: T[]): AsyncOperationFunction<T, T> {
  return (iterable) => concatAsync(iterable, values);
}
