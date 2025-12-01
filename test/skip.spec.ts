import { Stream } from "~/stream";
import { toArray } from "~/collectors/sync/toArray";
import { skip } from "~/operations/sync/skip";

describe("Operation function: skip()", () => {
  test("should skip the given amount of entries", () => {
    const res = new Stream([1, 2, 3]).pipe(skip(1)).collect(toArray());
    expect(res).toStrictEqual([2, 3]);
  });
});
