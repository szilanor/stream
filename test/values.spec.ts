import { values } from "~/creators/sync/values";

describe("Creator function: values()", () => {
  test("should return a Stream with the values of the parameter", () => {
    expect([...values({ a: 1, b: 2 })]).toStrictEqual([1, 2]);
  });
});
