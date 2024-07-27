import { Stream } from "../../stream";

/**
 * Return a Stream from the parameter entries
 */
export function of<T>(...entries: T[]): Stream<T> {
  return new Stream(entries);
}

export const streamOf = of;
