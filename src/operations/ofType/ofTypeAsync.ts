import {AsyncIterableIteratorBase, AsyncOperationFunction} from '../../types';

export class OfTypeAsyncIterator<
  T,
  TOfType extends T
> extends AsyncIterableIteratorBase<T, TOfType> {
  constructor(
    iterable: AsyncIterable<T>,
    private predicate: (item: T) => item is TOfType
  ) {
    super(iterable);
  }

  async next(): Promise<IteratorResult<TOfType>> {
    for (
      let item = await this.iterator.next();
      !item.done;
      item = await this.iterator.next()
    ) {
      if (this.predicate(item.value)) {
        return {done: item.done, value: item.value};
      }
    }
    return {done: true, value: undefined as unknown};
  }
}

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofTypeAsync<T, TOfType extends T>(
  predicate: (item: T) => item is TOfType
): AsyncOperationFunction<T, TOfType> {
  return iterable => new OfTypeAsyncIterator(iterable, predicate);
}
