import {AsyncOperationFunction} from '../../types';
import {fromAsyncIteratorMapper, isNotNullOrEmpty} from '../../utils';
import {FilterAsyncIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined / non-empty entries of the source Iterable. */
export function notNullOrEmptyAsync<
  T extends {length: number}
>(): AsyncOperationFunction<T | undefined | null, NonNullable<T>> {
  return fromAsyncIteratorMapper(
    iterator =>
      new FilterAsyncIterator<T | null | undefined, NonNullable<T>>(
        iterator,
        isNotNullOrEmpty
      )
  );
}
