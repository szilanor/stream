import { Stream } from "~/stream";
import { toArray } from "~/collectors/sync/toArray";
import { take } from "~/operations/sync/take";

describe("Operation function: take()", () => {
  test("should take the given amount of entries", () => {
    const res = new Stream([1, 2, 3]).pipe(take(1)).collect(toArray());
    expect(res).toStrictEqual([1]);
  });
});
