import { AsyncOperationFunction } from "~/types";
import { compoundAsync } from "./compoundAsync";
import { mapAsync } from "./mapAsync";
import { flatAsync } from "./flatAsync";

/**
 * Returns an Iterable that yields the inner entries of the
 * result produced by the function.
 */
export function flatMapAsync<T, O>(
  mapper: (value: T, index: number) => Iterable<O>,
): AsyncOperationFunction<T, O> {
  return compoundAsync(mapAsync(mapper), flatAsync());
}
