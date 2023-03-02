import {AsyncOperationFunction} from '../../types';
import {concatAsync} from '../../creators/concat/concatAsync';

/** Returns an Iterable started with the value parameter then the entries of the source Iterable. */
export function startWithAsync<T>(
  ...values: T[]
): AsyncOperationFunction<T, T> {
  return iterable => concatAsync(values, iterable);
}
