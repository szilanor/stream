import { toArrayAsync } from "../../collectors";
import { truthyAsync } from "./truthyAsync";
import { Stream } from "../../stream";

describe("Operation function: truthyAsync()", () => {
  test("should filter 0 as it is not a truthy value", async () => {
    const res = await new Stream([0, 1, 2])
      .pipeAsync(truthyAsync())
      .collectAsync(toArrayAsync());

    expect(res).toStrictEqual([1, 2]);
  });

  test("should filter truthy values", async () => {
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
    const res = await new Stream(truthyEntries)
      .pipeAsync(truthyAsync())
      .collectAsync(toArrayAsync());
    expect(res).toStrictEqual(truthyEntries);
  });
});
