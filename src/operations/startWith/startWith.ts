import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';
import {operationFunctionFactory} from '../../utils';

/** Returns an Iterable started with the value parameter then the entries of the source Iterable. */
export function startWith<T>(...values: T[]): OperationFunction<T, T> {
  return operationFunctionFactory(
    iterator => new ConcatIterator([values[Symbol.iterator](), iterator])
  );
}
