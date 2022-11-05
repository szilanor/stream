import {AsyncOperationFunction, OperationFunction} from '../../types';

export class OfTypeIterator<T, TOfType extends T>
  implements IterableIterator<TOfType>
{
  constructor(
    private iterator: Iterator<T>,
    private predicate: (item: T) => item is TOfType
  ) {}

  [Symbol.iterator](): IterableIterator<TOfType> {
    return this;
  }

  next(): IteratorResult<TOfType> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (this.predicate(item.value)) {
        return {done: item.done, value: item.value};
      }
    }
    return {done: true, value: undefined as unknown};
  }
}

export class OfTypeAsyncIterator<T, TOfType extends T>
  implements AsyncIterableIterator<TOfType>
{
  constructor(
    private iterator: AsyncIterator<T>,
    private predicate: (item: T) => item is TOfType
  ) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<TOfType> {
    return this;
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
export function ofType<T, TOfType extends T>(
  predicate: (item: T) => item is TOfType
): OperationFunction<T, TOfType> {
  return entries => new OfTypeIterator(entries[Symbol.iterator](), predicate);
}

export function ofTypeAsync<T, TOfType extends T>(
  predicate: (item: T) => item is TOfType
): AsyncOperationFunction<T, TOfType> {
  return entries =>
    new OfTypeAsyncIterator(entries[Symbol.asyncIterator](), predicate);
}
