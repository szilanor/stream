import {OperationFunction} from '../../types';
import {wrap} from '../../utils';
import {FilterIterator} from '../filter';
import {TypeGuardFunction} from '../../utils/util-types';

/** Returns and casts an Iterable that yields only entries of the source Iterable that satisfy the given type-guard function. */
export function ofType<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>
): OperationFunction<T, TOfType> {
  return wrap(iterator => new FilterIterator(iterator, predicate));
}
