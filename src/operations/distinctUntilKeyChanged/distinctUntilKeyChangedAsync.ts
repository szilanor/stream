import { AsyncOperationFunction } from "../../types";
import {
  doneResult,
  EqualsFunction,
  fromAsyncIteratorMapper,
  valueResult,
} from "../../utils";

class DistinctUntilKeyChangedAsyncIterator<T, K extends keyof T>
  implements AsyncIterator<T>
{
  private previous?: T[K];

  constructor(
    private iterator: AsyncIterator<T>,
    private key: K,
    private equalsFunction: EqualsFunction<T[K]> = (a, b) => a === b,
  ) {}

  async next(): Promise<IteratorResult<T>> {
    for (
      let { value, done } = await this.iterator.next();
      !done;
      { value, done } = await this.iterator.next()
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

export function distinctUntilKeyChangedAsync<T, K extends keyof T>(
  key: K,
  equalsFunction?: EqualsFunction<T[K]>,
): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    (iterator) =>
      new DistinctUntilKeyChangedAsyncIterator(iterator, key, equalsFunction),
  );
}
