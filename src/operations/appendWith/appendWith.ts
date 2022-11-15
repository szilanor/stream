import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';

/** Concatenates the Iterable with other Iterables in order */
export function appendWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return iterable => new ConcatIterator([...iterables, iterable]);
}
