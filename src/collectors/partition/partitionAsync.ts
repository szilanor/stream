import { AsyncCollectorFunction } from "../../types";
import { MaybeAsyncPredicateFunction } from "../../utils";
import { reduceAsync } from "../reduce";

export function partitionAsync<T>(
  predicate: MaybeAsyncPredicateFunction<T>,
): AsyncCollectorFunction<T, [T[], T[]]> {
  return reduceAsync(
    async (previous, current, index) => {
      if (await predicate(current, index)) {
        previous[0].push(current);
      } else {
        previous[1].push(current);
      }
      return previous;
    },
    () => [new Array<T>(), new Array<T>()],
  );
}
