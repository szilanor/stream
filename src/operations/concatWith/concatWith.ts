import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';

/** Concatenates the Iterable with other Iterables in order */
export function concatWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return entries =>
    new ConcatIterator([
      entries[Symbol.iterator](),
      ...iterables.map(iterable => iterable[Symbol.iterator]()),
    ]);
}
