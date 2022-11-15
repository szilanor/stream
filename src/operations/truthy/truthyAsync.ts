import {AsyncOperationFunction} from '../../types';
import {FilterAsyncIterator} from '../filter/filterAsync';

/** Returns an Iterable that yields only entries of the source Iterable with truthy value. */
export function truthyAsync<T>(): AsyncOperationFunction<T, T> {
  return iterable => new FilterAsyncIterator(iterable, value => !!value);
}
