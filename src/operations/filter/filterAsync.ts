import {AnyToAsyncOperationFunction} from '../../types';
import {anyOperationFunctionFactory, isPromise} from '../../utils';

export class FilterAsyncIterator<T> implements AsyncIterator<T> {
  private index = 0;

  constructor(
    private iterator: Iterator<T> | AsyncIterator<T>,
    private predicate: (
      value: T,
      index: number
    ) => boolean | PromiseLike<boolean>
  ) {}

  async next(): Promise<IteratorResult<T>> {
    do {
      const result = this.iterator.next();
      const {value, done} = isPromise(result) ? await result : result;

      if (done) {
        return {done: true, value: undefined as unknown};
      }

      const predicateResult = this.predicate(value, this.index++);
      if (
        isPromise(predicateResult) ? await predicateResult : predicateResult
      ) {
        return {done: false, value};
      }
      // eslint-disable-next-line no-constant-condition
    } while (true);
  }
}

/** Returns an Iterable that yields only entries of the source Iterable that satisfy the function. */
export function filterAsync<T>(
  func: (value: T, index: number) => boolean | PromiseLike<boolean>
): AnyToAsyncOperationFunction<T, T> {
  return anyOperationFunctionFactory(
    iterator => new FilterAsyncIterator(iterator, func)
  );
}
