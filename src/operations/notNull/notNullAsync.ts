import {AsyncOperationFunction} from '../../types';
import {isNotNull, wrapAsync} from '../../utils';
import {FilterAsyncIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNullAsync<T>(): AsyncOperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return wrapAsync(
    source =>
      new FilterAsyncIterator<T | undefined | null, NonNullable<T>>(
        source,
        isNotNull
      )
  );
}
