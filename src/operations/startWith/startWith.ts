import { OperationFunction } from "../../types";
import { concat } from "../../creators";

/** Returns an Iterable started with the value parameter then the entries of the source Iterable. */
export function startWith<T>(...values: T[]): OperationFunction<T, T> {
  return (iterable) => concat(values, iterable);
}
