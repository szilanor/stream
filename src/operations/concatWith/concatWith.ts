import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';
import {operationFunctionFactory} from '../../utils';

/** Concatenates the Iterable with other Iterables in order */
export function concatWith<T>(
  ...iterables: Iterable<T>[]
): OperationFunction<T, T> {
  return operationFunctionFactory(
    iterator =>
      new ConcatIterator([
        iterator,
        ...iterables.map(iterable => iterable[Symbol.iterator]()),
      ])
  );
}
