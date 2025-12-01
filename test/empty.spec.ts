import { empty } from "~/creators/sync/empty";
import { toArray } from "~/collectors/sync/toArray";

describe("Creator function: empty()", () => {
  test("should return empty Stream", () => {
    const res = empty().collect(toArray());
    expect(res).toStrictEqual([]);
  });
});
