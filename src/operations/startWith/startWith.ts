import {OperationFunction} from '../../types';
import {ConcatIterable} from '../../creators';

/** Returns an Iterable started with the value parameter then the entries of the source Iterable. */
export function startWith<T>(...values: T[]): OperationFunction<T, T> {
  return iterable => new ConcatIterable([values, iterable]);
}
