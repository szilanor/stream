import { AsyncCollectorFunction } from "../../types";
import {
  callValueOrFactory,
  MaybeAsyncPredicateFunction,
  ValueOrFactory,
} from "../../utils";
import { lastAsync } from "../last";

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastOrDefaultAsync<T>(
  defaultValue: ValueOrFactory<T>,
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, T | undefined> {
  return async (source) =>
    (await lastAsync(predicate)(source)) ?? callValueOrFactory(defaultValue);
}

export const findLastOrDefaultAsync = lastOrDefaultAsync;
