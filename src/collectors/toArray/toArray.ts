import {CollectorFunction} from '../../types';

/** Creates an Array from an Iterable */
export function toArray<T>(): CollectorFunction<T, T[]> {
  return stream => Array.from(stream);
}
