import {AsyncOperationFunction, OperationFunction} from '../../types';

export class FilterIterator<T> implements IterableIterator<T> {
  private index = 0;

  constructor(
    private iterator: Iterator<T>,
    private predicate: (value: T, index: number) => boolean
  ) {}

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    for (
      let item = this.iterator.next();
      !item.done;
      item = this.iterator.next()
    ) {
      if (this.predicate(item.value, this.index++)) {
        return {done: false, value: item.value};
      }
    }
    return {done: true, value: undefined as unknown};
  }
}

export class FilterAsyncIterator<T> implements AsyncIterableIterator<T> {
  private index = 0;

  constructor(
    private iterator: AsyncIterator<T>,
    private predicate: (
      value: T,
      index: number
    ) => boolean | PromiseLike<boolean>
  ) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }

  async next(): Promise<IteratorResult<T>> {
    for (
      let item = await this.iterator.next();
      !item.done;
      item = await this.iterator.next()
    ) {
      if (await this.predicate(item.value, this.index++)) {
        return {done: false, value: item.value};
      }
    }
    return {done: true, value: undefined as unknown};
  }
}

/** Returns an Iterable that yields only entries of the source Iterable that satisfy the function. */
export function filter<T>(
  func: (value: T, index: number) => boolean
): OperationFunction<T, T> {
  return entries => new FilterIterator(entries[Symbol.iterator](), func);
}

export function filterAsync<T>(
  func: (value: T, index: number) => boolean | PromiseLike<boolean>
): AsyncOperationFunction<T, T> {
  return entries =>
    new FilterAsyncIterator(entries[Symbol.asyncIterator](), func);
}
