import type { OperationFunction } from "../../types";
import { compound } from "../compound";
import { map } from "../map";
import { flat } from "../flat";

/**
 * Returns an Iterable that yields the inner entries of the
 * result produced by the function.
 */
export function flatMap<T, O>(
  mapper: (value: T, index: number) => Iterable<O>,
): OperationFunction<T, O> {
  return compound(map(mapper), flat());
}
