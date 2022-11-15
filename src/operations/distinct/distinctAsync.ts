import {AsyncIterableIteratorBase, AsyncOperationFunction} from '../../types';

export class DistinctAsyncIterator<T> extends AsyncIterableIteratorBase<T> {
  private items: Set<T> = new Set<T>();

  constructor(iterable: AsyncIterable<T>) {
    super(iterable);
  }

  async next(): Promise<IteratorResult<T>> {
    for (
      let item = await this.iterator.next();
      !item.done;
      item = await this.iterator.next()
    ) {
      if (!this.items.has(item.value)) {
        this.items.add(item.value);
        return {done: item.done, value: item.value};
      }
    }

    this.items.clear();
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinctAsync<T>(): AsyncOperationFunction<T, T> {
  return iterable => new DistinctAsyncIterator(iterable);
}
