import {AsyncOperationFunction, OperationFunction} from '../../types';

/** Simply returns every entry from the source Iterable */
export function noop<T>(): OperationFunction<T, T> {
  return entries => entries;
}

export function noopAsync<T>(): AsyncOperationFunction<T, T> {
  return entries => entries;
}
