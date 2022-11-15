import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';

/** Returns an Iterable with the entries of the source Iterable then the parameter value. */
export function endWith<T>(...values: T[]): OperationFunction<T, T> {
  return iterable => new ConcatIterator([iterable, values[Symbol.iterator]()]);
}
