import {AnyToAsyncOperationFunction} from '../../types';
import {anyOperationFunctionFactory, isPromise} from '../../utils';

export class MapAsyncIterator<T, O> implements AsyncIterator<O> {
  private index = 0;

  constructor(
    private iterator: Iterator<T> | AsyncIterator<T>,
    private mapper: (value: T, index: number) => O | PromiseLike<O>
  ) {}

  async next(): Promise<IteratorResult<O>> {
    const result = this.iterator.next();
    const {value, done} = isPromise(result) ? await result : result;

    if (done) {
      return {done, value: undefined as unknown};
    } else {
      const newValue = this.mapper(value, this.index++);
      return {done, value: isPromise(newValue) ? await newValue : newValue};
    }
  }
}

/** Returns an Iterable that yields entries of the source Iterable transformed using the function */
export function mapAsync<T, O>(
  func: (value: T, index: number) => O | PromiseLike<O>
): AnyToAsyncOperationFunction<T, O> {
  return anyOperationFunctionFactory(
    iterator => new MapAsyncIterator(iterator, func)
  );
}
