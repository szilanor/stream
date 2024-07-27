import { Stream } from "../../stream";
import { toArray } from "../../collectors";
import { arrayMap } from "./arrayMap";

describe("Operation function: arrayMap()", () => {
  test("should map the elements of array entries", () => {
    const res = new Stream([
      [1, 2, 3],
      [4, 5, 6],
    ])
      .pipe(arrayMap((entry) => entry + 1))
      .collect(toArray());
    expect(res).toStrictEqual([
      [2, 3, 4],
      [5, 6, 7],
    ]);
  });
});
