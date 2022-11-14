import {AsyncOperationFunction} from '../../types';
import {asyncOperationFunctionFactory} from '../../utils';

export class DistinctAsyncIterator<T> implements AsyncIterator<T> {
  private items: Set<T> = new Set<T>();

  constructor(private iterator: AsyncIterator<T>) {}

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
  return asyncOperationFunctionFactory(
    iterator => new DistinctAsyncIterator(iterator)
  );
}
