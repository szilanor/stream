import {AsyncOperationFunction} from '../../types';
import {isNotNullOrWhitespace, wrapAsync} from '../../utils';
import {FilterAsyncIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrWhitespaceAsync(): AsyncOperationFunction<
  string | null | undefined,
  NonNullable<string>
> {
  return wrapAsync(
    iterator =>
      new FilterAsyncIterator<string | null | undefined, NonNullable<string>>(
        iterator,
        isNotNullOrWhitespace
      )
  );
}
