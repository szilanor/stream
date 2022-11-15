import {
  AnyToAsyncIndexedIterableIteratorBase,
  AnyToAsyncOperationFunction,
} from '../../types';
import {isPromise} from '../../utils';

export class FilterAsyncIterator<
  T
> extends AnyToAsyncIndexedIterableIteratorBase<T> {
  constructor(
    iterable: Iterable<T> | AsyncIterable<T>,
    private predicate: (
      value: T,
      index: number
    ) => boolean | PromiseLike<boolean>
  ) {
    super(iterable);
  }

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
  return iterable => new FilterAsyncIterator(iterable, func);
}
