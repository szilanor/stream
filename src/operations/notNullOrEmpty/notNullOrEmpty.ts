import { OperationFunction } from "../../types";
import { fromIteratorMapper, isNotNullOrEmpty } from "../../utils";
import { FilterIterator } from "../filter/filter";

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmpty<
  T extends { length: number },
>(): OperationFunction<T | null | undefined, NonNullable<T>> {
  return fromIteratorMapper(
    (iterator) =>
      new FilterIterator<T | null | undefined, NonNullable<T>>(
        iterator,
        isNotNullOrEmpty,
      ),
  );
}
