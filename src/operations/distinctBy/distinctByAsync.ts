import {AsyncIterableIteratorBase, AsyncOperationFunction} from '../../types';
import {isPromise} from '../../utils';

export class DistinctAsyncIterator<T> extends AsyncIterableIteratorBase<T> {
  private items: Array<T> = new Array<T>();

  constructor(
    iterable: AsyncIterable<T>,
    private comparer: (a: T, b: T) => boolean | PromiseLike<boolean> = (a, b) =>
      a === b
  ) {
    super(iterable);
  }

  async next(): Promise<IteratorResult<T>> {
    for (
      let item = await this.iterator.next();
      !item.done;
      item = await this.iterator.next()
    ) {
      let found = false;

      for (const cached of this.items) {
        const compareResult = this.comparer(cached, item.value);
        found = isPromise(compareResult) ? await compareResult : compareResult;
      }

      if (!found) {
        this.items.push(item.value);
        return {done: item.done, value: item.value};
      }
    }

    this.items = [];
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields only entries of the source Iterable without duplicates. */
export function distinctByAsync<T>(
  comparer: (a: T, b: T) => boolean | PromiseLike<boolean> = (a, b) => a === b
): AsyncOperationFunction<T, T> {
  return iterable => new DistinctAsyncIterator(iterable, comparer);
}
