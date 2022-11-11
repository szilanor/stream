import {CollectorFunction} from '../../types';

/** Creates a Set from an Iterable */
export function toSet<T>(): CollectorFunction<T, Set<T>> {
  return stream => new Set<T>(stream);
}
