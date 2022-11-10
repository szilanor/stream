import {AsyncOperationFunction} from '../../types';
import {asyncOperationFunctionFactory} from '../../utils';
import {FilterAsyncIterator} from '../filter/filterAsync';

/** Returns an Iterable that yields only entries of the source Iterable with falsy value. */
export function falsyAsync<T>(): AsyncOperationFunction<T, T> {
  return asyncOperationFunctionFactory(
    iterator => new FilterAsyncIterator(iterator, value => !value)
  );
}
