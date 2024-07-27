import { AsyncOperationFunction } from "../../types";
import { fromAsyncIteratorMapper, isNotNullOrWhitespace } from "../../utils";
import { FilterAsyncIterator } from "../filter/filterAsync";

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespaceAsync(): AsyncOperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return fromAsyncIteratorMapper(
    (iterator) =>
      new FilterAsyncIterator<string | null | undefined, NonNullable<string>>(
        iterator,
        isNotNullOrWhitespace,
      ),
  );
}
