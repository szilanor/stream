import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';

/** Concatenates the Iterable with other Iterables in order */
export function appendWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return entries =>
    new ConcatIterator([
      ...iterables.map(iterable => iterable[Symbol.iterator]()),
      entries[Symbol.iterator](),
    ]);
}
