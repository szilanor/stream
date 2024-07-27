import { OperationFunction } from "../../types";
import { map } from "../map";

export function withIndex<T>(): OperationFunction<T, [T, number]> {
  return map((x, index) => [x, index]);
}
