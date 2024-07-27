import { CollectorFunction } from "../../types";
import { last } from "../last";
import {
  callValueOrFactory,
  PredicateFunction,
  ValueOrFactory,
} from "../../utils";

/** Returns the last entry from the Iterable that satisfy then 'predicate' function. */
export function lastOrDefault<T>(
  defaultValue: ValueOrFactory<T>,
  predicate: PredicateFunction<T> = () => true,
): CollectorFunction<T, T | undefined> {
  return (source) =>
    last(predicate)(source) ?? callValueOrFactory(defaultValue);
}

export const findLastOrDefault = lastOrDefault;
