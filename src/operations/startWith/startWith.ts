import {OperationFunction} from '../../types';
import {ConcatIterator} from '../../creators';

/** Returns an Iterable started with the value parameter then the entries of the source Iterable. */
export function startWith<T>(...values: T[]): OperationFunction<T, T> {
  return entries =>
    new ConcatIterator([values[Symbol.iterator](), entries[Symbol.iterator]()]);
}
