import { keys } from "~/creators/sync/keys";

describe("Creator function: keys()", () => {
  test("should return a Stream with the keys of the parameter", () => {
    expect([...keys({ a: 1, b: 2 })]).toStrictEqual(["a", "b"]);
  });
});
