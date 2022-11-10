import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType/ofType';
import {operationFunctionFactory} from '../../utils';
import {isNotNullOrEmpty} from './isNotNullOrEmpty.typeguard';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmpty<T extends {length: number}>(): OperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return operationFunctionFactory(
    iterator => new OfTypeIterator(iterator, isNotNullOrEmpty)
  );
}
