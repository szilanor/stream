import {AsyncOperationFunction} from '../../types';
import {OfTypeAsyncIterator} from '../ofType/ofTypeAsync';
import {isNotNullOrWhitespace} from '../../utils';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespaceAsync(): AsyncOperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return iterable => new OfTypeAsyncIterator(iterable, isNotNullOrWhitespace);
}
