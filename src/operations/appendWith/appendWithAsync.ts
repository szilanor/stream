import {AsyncOperationFunction} from '../../types';
import {concatAsync} from '../../creators/concat/concatAsync';

/** Concatenates the Iterable with other Iterables in order */
export function appendWithAsync<T>(
  ...iterables: Iterable<T>[]
): AsyncOperationFunction<T, T> {
  return iterable => concatAsync(...iterables, iterable);
}
