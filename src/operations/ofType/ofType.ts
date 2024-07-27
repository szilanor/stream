import { OperationFunction } from "../../types";
import { fromIteratorMapper, TypeGuardFunction } from "../../utils";
import { FilterIterator } from "../filter/filter";

export function ofType<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>,
): OperationFunction<T, TOfType> {
  return fromIteratorMapper(
    (iterator) => new FilterIterator(iterator, predicate),
  );
}
