import { from } from "~/creators/sync/from";

describe("Creator function: from()", () => {
  test("should return a Stream with the entries of the parameter", () => {
    expect([...from([1, 2, 3])]).toStrictEqual([1, 2, 3]);
  });
});
