import {AsyncOperationFunction} from '../../types';
import {fromAsyncIteratorMapper, isNotNull} from '../../utils';
import {FilterAsyncIterator} from '../filter';

/** Returns an Iterable that yields only the non-null / non-undefined entries of the source Iterable. */
export function notNullAsync<T>(): AsyncOperationFunction<
  T | undefined | null,
  NonNullable<T>
> {
  return fromAsyncIteratorMapper(
    source =>
      new FilterAsyncIterator<T | undefined | null, NonNullable<T>>(
        source,
        isNotNull
      )
  );
}
