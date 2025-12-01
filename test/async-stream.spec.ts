import { stream } from "~/creators/sync/from";
import { toArrayAsync } from "~/collectors/async/toArrayAsync";
import { mapAsync } from "~/operations/async/mapAsync";

describe("AsyncStream", () => {
  test("Pipe chaining", async () => {
    const input = [1, 2, 3, 4, 5];

    const res = await stream(input)
      .pipeAsync(mapAsync(async (x) => x))
      .collectAsync(toArrayAsync());

    expect(res).toStrictEqual(input);
  });
});
