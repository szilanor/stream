import {OperationFunction} from '../../types';
import {TypeGuardFunction, wrap} from '../../utils';
import {FilterIterator} from '../filter';

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofType<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>
): OperationFunction<T, TOfType> {
  return wrap(iterator => new FilterIterator(iterator, predicate));
}
