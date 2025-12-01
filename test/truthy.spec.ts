import { Stream } from "~/stream";
import { toArray } from "~/collectors/sync/toArray";
import { truthy } from "~/operations/sync/truthy";

describe("Operation function: truthy()", () => {
  test("should filter 0 as it is not a truthy value", () => {
    const res = new Stream([0, 1, 2]).pipe(truthy()).collect(toArray());
    expect(res).toStrictEqual([1, 2]);
  });

  test("should filter truthy values", () => {
    const truthyEntries = [
      true,
      {},
      [],
      1,
      "0",
      "false",
      new Date(),
      -1,
      3.14,
      Infinity,
      -Infinity,
    ];
    const res = new Stream(truthyEntries).pipe(truthy()).collect(toArray());
    expect(res).toStrictEqual(truthyEntries);
  });
});
