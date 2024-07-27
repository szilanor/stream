import { Stream } from "../../stream";
import { toArray } from "../../collectors";
import { pairwise } from "./pairwise";

describe("Operation function: pairwise()", () => {
  test("should create an array of arrays with the previous and the current element", () => {
    const res = new Stream([1, 2, 3]).pipe(pairwise()).collect(toArray());
    expect(res).toStrictEqual([
      [1, 2],
      [2, 3],
    ]);
  });
});
