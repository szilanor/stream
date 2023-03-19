import {OperationFunction} from '../../types';
import {TypeGuardFunction, wrap} from '../../utils';
import {FilterIterator} from '../filter';

export function ofType<T, TOfType extends T = T>(
  predicate: TypeGuardFunction<T, TOfType>
): OperationFunction<T, TOfType> {
  return wrap(iterator => new FilterIterator(iterator, predicate));
}
