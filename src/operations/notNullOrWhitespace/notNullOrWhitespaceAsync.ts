import {AsyncOperationFunction} from '../../types';
import {asyncOperationFunctionFactory} from '../../utils';
import {isNotNullOrWhitespace} from './isNotNullOrWhitespace.typeguard';
import {OfTypeAsyncIterator} from '../ofType/ofTypeAsync';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespaceAsync(): AsyncOperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return asyncOperationFunctionFactory(
    iterator => new OfTypeAsyncIterator(iterator, isNotNullOrWhitespace)
  );
}
