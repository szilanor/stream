import {AsyncOperationFunction} from '../../types';
import {FilterAsyncIterator} from '../filter';
import {fromAsyncIteratorMapper} from '../../utils';

/** Returns an Iterable that yields only entries of the source Iterable with falsy value. */
export function falsyAsync<T>(): AsyncOperationFunction<T, T> {
  return fromAsyncIteratorMapper(
    iterator => new FilterAsyncIterator(iterator, value => !value)
  );
}
