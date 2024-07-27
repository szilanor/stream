import { CollectorFunction } from "../../types";

/** Creates a Set from an Iterable */
export function toSet<T>(): CollectorFunction<T, Set<T>> {
  return (source) => new Set<T>(source);
}
