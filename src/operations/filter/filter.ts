import { OperationFunction } from "../../types";
import {
  doneResult,
  fromIteratorMapper,
  PredicateFunction,
  TypeGuardFunction,
  valueResult,
} from "../../utils";

export class FilterIterator<T, TOfType extends T = T>
  implements Iterator<TOfType>
{
  index = 0;

  constructor(
    protected iterator: Iterator<T>,
    private predicate: PredicateFunction<T> | TypeGuardFunction<T, TOfType>,
  ) {}

  next(): IteratorResult<TOfType> {
    for (
      let { done, value } = this.iterator.next();
      !done;
      { done, value } = this.iterator.next()
    ) {
      if (this.predicate(value, this.index++)) {
        return valueResult(value);
      }
    }
    return doneResult();
  }
}

/** Returns an Iterable that yields only entries of the source Iterable that satisfy the function. */
export function filter<T, TOfType extends T = T>(
  predicate: PredicateFunction<T> | TypeGuardFunction<T, TOfType>,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) => new FilterIterator(iterator, predicate),
  );
}
