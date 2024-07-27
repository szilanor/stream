import { AsyncOperationFunction } from "../../types";

/** Simply returns every entry from the source Iterable */
export function noopAsync<T>(): AsyncOperationFunction<T, T> {
  return (source) => source;
}
