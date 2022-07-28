import {OperationFunction} from '../../types';

export class MapIterator<T, O> implements IterableIterator<O> {
  private index = 0;

  constructor(
    private iterator: Iterator<T>,
    private mapper: (value: T, index: number) => O
  ) {}

  [Symbol.iterator](): IterableIterator<O> {
    return this;
  }

  next(): IteratorResult<O> {
    const {value, done} = this.iterator.next();
    return done
      ? {done, value: undefined as unknown}
      : {done, value: this.mapper(value, this.index++)};
  }
}

/** Returns an Iterable that yields entries of the source Iterable transformed using the function */
export function map<T, O>(
  func: (value: T, index: number) => O
): OperationFunction<T, O> {
  return entries => new MapIterator(entries[Symbol.iterator](), func);
}
