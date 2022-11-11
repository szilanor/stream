import {AsyncOperationFunction} from '../../types';
import {asyncOperationFunctionFactory} from '../../utils';

export class PairwiseAsyncIterator<T> implements AsyncIterator<[T, T]> {
  private prev: T | undefined;

  constructor(private iterator: AsyncIterator<T>) {}

  async next(): Promise<IteratorResult<[T, T]>> {
    for (
      let item = await this.iterator.next();
      !item.done;
      item = await this.iterator.next()
    ) {
      if (this.prev) {
        const result: IteratorResult<[T, T]> = {
          done: false,
          value: [this.prev, item.value],
        };
        this.prev = item.value;
        return result;
      }
      this.prev = item.value;
    }
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields the current and the previous entry of the source Iterable. */
export function pairwiseAsync<T>(): AsyncOperationFunction<T, [T, T]> {
  return asyncOperationFunctionFactory(
    iterator => new PairwiseAsyncIterator(iterator)
  );
}
