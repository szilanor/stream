import {AsyncOperationFunction} from '../../types';
import {isNotNullOrEmpty, wrapAsync} from '../../utils';
import {FilterAsyncIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmptyAsync<
  T extends {length: number}
>(): AsyncOperationFunction<T | undefined | null, NonNullable<T>> {
  return wrapAsync(
    iterator =>
      new FilterAsyncIterator<T | null | undefined, NonNullable<T>>(
        iterator,
        isNotNullOrEmpty
      )
  );
}
