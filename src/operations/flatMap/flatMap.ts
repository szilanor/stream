import type {OperationFunction} from '../../types';

export class FlatMapIterator<T, O> implements IterableIterator<O> {
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

/**
 * Returns an Iterable that yields the inner entries of the
 * result produced by the function.
 */
export function flatMap<T, O>(
  func: (
    value: T,
    index: number
  ) => Iterable<O> | Generator<O, unknown, unknown>
): OperationFunction<T, O> {
  return entries =>
    (function* () {
      let index = 0;
      for (const entry of entries) {
        yield* func(entry, index++);
      }
    })();
}
