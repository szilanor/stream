import { CollectorFunction } from "../../types";
import {
  callValueOrFactory,
  ReduceFunction,
  ValueOrFactory,
} from "../../utils";

/** Executes a reducer function on each entry of the Iterable, resulting in a single output value. */
export function reduce<T, O>(
  reducerFunction: ReduceFunction<T, O>,
  initialValue: ValueOrFactory<O>,
): CollectorFunction<T, O> {
  return (source) => {
    let prev = callValueOrFactory(initialValue);
    let index = 0;
    for (const entry of source) {
      prev = reducerFunction(prev, entry, index++);
    }
    return prev;
  };
}
