import {AsyncOperationFunction} from '../../types';
import {FilterAsyncIterator} from '../filter';
import {wrapAsync} from '../../utils';

/** Returns an Iterable that yields only entries of the source Iterable with truthy value. */
export function truthyAsync<T>(): AsyncOperationFunction<T, T> {
  return wrapAsync(
    iterator => new FilterAsyncIterator(iterator, value => !!value)
  );
}
