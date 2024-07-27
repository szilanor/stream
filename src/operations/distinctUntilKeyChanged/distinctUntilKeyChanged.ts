import { OperationFunction } from "../../types";
import {
  doneResult,
  EqualsFunction,
  fromIteratorMapper,
  valueResult,
} from "../../utils";

class DistinctUntilKeyChangedIterator<T, K extends keyof T>
  implements Iterator<T>
{
  private previous?: T[K];

  constructor(
    private iterator: Iterator<T>,
    private key: K,
    private equalsFunction: EqualsFunction<T[K]> = (a, b) => a === b,
  ) {}

  next(): IteratorResult<T> {
    for (
      let { value, done } = this.iterator.next();
      !done;
      { value, done } = this.iterator.next()
    ) {
      const keyValue = value[this.key];
      if (!this.previous || !this.equalsFunction(keyValue, this.previous)) {
        this.previous = keyValue;
        return valueResult(value);
      }
    }
    this.previous = undefined;
    return doneResult();
  }
}

export function distinctUntilKeyChanged<T, K extends keyof T>(
  key: K,
  equalsFunction?: EqualsFunction<T[K]>,
): OperationFunction<T, T> {
  return fromIteratorMapper(
    (iterator) =>
      new DistinctUntilKeyChangedIterator(iterator, key, equalsFunction),
  );
}
