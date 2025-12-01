import { Stream } from "~/stream";
import { toArray } from "~/collectors/sync/toArray";
import { tap } from "~/operations/sync/tap";

describe("Operation function: tap()", () => {
  test("should call a callback function after each entry", () => {
    let counter = 0;
    new Stream([1, 2, 3]).pipe(tap(() => counter++)).collect(toArray());
    expect(counter).toBe(3);
  });
});
