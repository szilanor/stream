import { Stream } from "~/stream";
import { toArray } from "~/collectors/sync/toArray";
import { skipWhile } from "~/operations/sync/skipWhile";

describe("Operation function: skipWhile()", () => {
  test("should skip while the callback function returns true", () => {
    const res = new Stream([1, 1, 1, 2, 3])
      .pipe(skipWhile((entry) => entry % 2 === 1))
      .collect(toArray());
    expect(res).toStrictEqual([2, 3]);
  });
});
