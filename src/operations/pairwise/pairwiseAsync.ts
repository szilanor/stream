import {AsyncIterableIteratorBase, AsyncOperationFunction} from '../../types';

export class PairwiseAsyncIterator<T> extends AsyncIterableIteratorBase<
  T,
  [T, T]
> {
  private prev: T | undefined;

  constructor(iterable: AsyncIterable<T>) {
    super(iterable);
  }

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
  return iterable => new PairwiseAsyncIterator(iterable);
}
