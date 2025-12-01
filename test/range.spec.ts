import { range } from "~/creators/sync/range";

describe("Creator function: range()", () => {
  test("should return an empty Stream", () => {
    expect([...range(0, 0)]).toStrictEqual([]);
  });

  test("should return a Stream of 3 entries from 0", () => {
    expect([...range(0, 3, 1)]).toStrictEqual([0, 1, 2]);
  });

  test("should return a Stream of 3 entries from 0 and the step should be 3", () => {
    expect([...range(0, 3, 3)]).toStrictEqual([0, 3, 6]);
  });
});
