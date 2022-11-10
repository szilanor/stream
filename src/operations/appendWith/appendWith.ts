import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';
import {operationFunctionFactory} from '../../utils';

/** Concatenates the Iterable with other Iterables in order */
export function appendWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return operationFunctionFactory(
    iterator =>
      new ConcatIterator([
        ...iterables.map(iterable => iterable[Symbol.iterator]()),
        iterator,
      ])
  );
}
