import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';
import {operationFunctionFactory} from '../../utils';

/** Returns an Iterable with the entries of the source Iterable then the parameter value. */
export function endWith<T>(...values: T[]): OperationFunction<T, T> {
  return operationFunctionFactory(
    iterator => new ConcatIterator([iterator, values[Symbol.iterator]()])
  );
}
