import {CollectorFunction} from '../../types';
import {Stream} from '../../stream';

/** Creates an Array from an Iterable */
export function toArray<T>(): CollectorFunction<T, T[]> {
  return stream => Array.from(stream);
}

declare module '../../stream' {
  interface Stream<T> {
    toArray(): T[];
  }
}

Stream.prototype.toArray = function <T>(this: Stream<T>) {
  return this.collect(toArray());
};
