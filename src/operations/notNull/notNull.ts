import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType/ofType';
import {operationFunctionFactory} from '../../utils';
import {isNotNull} from './notNull.typeguard';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNull<T>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return operationFunctionFactory(
    iterator => new OfTypeIterator(iterator, isNotNull)
  );
}
