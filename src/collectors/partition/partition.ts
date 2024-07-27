import { CollectorFunction } from "../../types";
import { PredicateFunction } from "../../utils";
import { reduce } from "../reduce";

export function partition<T>(
  predicate: PredicateFunction<T>,
): CollectorFunction<T, [T[], T[]]> {
  return reduce(
    (previous, current, index) => {
      if (predicate(current, index)) {
        previous[0].push(current);
      } else {
        previous[1].push(current);
      }
      return previous;
    },
    () => [new Array<T>(), new Array<T>()],
  );
}
