import { Stream } from "~/stream";
import { toArray } from "~/collectors/sync/toArray";
import { startWith } from "~/operations/sync/startWith";
import { empty } from "~/creators/sync/empty";

describe("Operation function: startWith()", () => {
  test("should return only the value parameter on empty stream", () => {
    const res = empty<number>().pipe(startWith(1)).collect(toArray());
    expect(res).toStrictEqual([1]);
  });

  test("should prepend the value", () => {
    const res = new Stream([1, 2, 3]).pipe(startWith(0)).collect(toArray());
    expect(res).toStrictEqual([0, 1, 2, 3]);
  });
});
