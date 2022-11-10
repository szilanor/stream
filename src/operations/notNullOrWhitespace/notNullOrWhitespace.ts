import {OperationFunction} from '../../types';
import {OfTypeIterator} from '../ofType/ofType';
import {operationFunctionFactory} from '../../utils';
import {isNotNullOrWhitespace} from './isNotNullOrWhitespace.typeguard';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespace(): OperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return operationFunctionFactory(
    iterator => new OfTypeIterator(iterator, isNotNullOrWhitespace)
  );
}
