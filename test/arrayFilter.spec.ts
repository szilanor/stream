import { Stream } from "~/stream";
import { arrayFilter } from "~/operations/sync/arrayFilter";
import { toArray } from "~/collectors/sync/toArray";

describe("Operation function: arrayFilter()", () => {
  test("should filter the elements of array entries", () => {
    const res = new Stream([
      [1, 2, 3],
      [4, 5, 6],
    ])
      .pipe(arrayFilter((entry) => entry % 2 === 0))
      .collect(toArray());
    expect(res).toStrictEqual([[2], [4, 6]]);
  });
});
