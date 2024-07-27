import { CollectorFunction } from "../../types";
import { PredicateFunction } from "../../utils";

/** Returns the number of entries in the Iterable. */
export function count<T>(
  predicateFunction: PredicateFunction<T> = () => true,
): CollectorFunction<T, number> {
  return (source) => {
    let counter = 0;
    let index = 0;
    for (const entry of source) {
      if (predicateFunction(entry, index++)) {
        counter++;
      }
    }
    return counter;
  };
}

export const length = count;
