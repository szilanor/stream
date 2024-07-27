import { AsyncOperationFunction } from "../../types";
import { FilterAsyncIterator } from "../filter/filterAsync";
import { fromAsyncIteratorMapper } from "../../utils";

/** Returns an Iterable that yields only entries of the source Iterable with truthy value. */
export function truthyAsync<T>(): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) => new FilterAsyncIterator(iterator, (value) => !!value),
  );
}
