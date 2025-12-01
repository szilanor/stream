import type { AsyncCollectorFunction, MaybeAsyncPredicateFunction, ValueOrFactory } from "~/types";
import { callValueOrFactory } from "~/utils";
import { firstAsync } from "./firstAsync";

/** Returns the first entry from the Iterable that satisfy then 'predicate' function or the 'defaultValue'. */
export function firstOrDefaultAsync<T>(
  defaultValue: ValueOrFactory<T>,
  predicate: MaybeAsyncPredicateFunction<T> = () => true,
): AsyncCollectorFunction<T, T> {
  return async (source) =>
    (await firstAsync(predicate)(source)) ?? callValueOrFactory(defaultValue);
}

export const findOrDefaultAsync = firstOrDefaultAsync;
