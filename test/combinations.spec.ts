import { combinations } from "~/creators/sync/combinations";

describe("Creator function: combinations()", () => {

  test("should return a Stream with the combinations of the parameter", () => {
    expect([...combinations([1, 2, 3], 2)]).toStrictEqual([[1, 2], [1, 3], [2, 3]]);
  });

  test("should return a Stream with the combinations of the parameter", () => {
    expect([...combinations([1, 2, 3], 3)]).toStrictEqual([[1, 2, 3]]);
  });

  test("should return a Stream with the combinations of the parameter", () => {
    expect([...combinations([1, 2, 3], 1)]).toStrictEqual([[1], [2], [3]]);
  });

  test("should return a Stream with the combinations of the parameter", () => {
    expect([...combinations([1, 2, 3], 0)]).toStrictEqual([[]]);
  });
});
