import { entries } from "~/creators/sync/entries";

describe("Creator function: entries()", () => {
  test("should return a Stream with the entries of the parameter", () => {
    expect([...entries({ a: 1, b: 2 })]).toStrictEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });
});
