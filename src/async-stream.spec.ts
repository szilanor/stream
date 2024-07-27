import { stream } from "./creators";
import { toArrayAsync } from "./collectors";
import { mapAsync } from "./operations";

describe("AsyncStream", () => {
  test("Pipe chaining", async () => {
    const input = [1, 2, 3, 4, 5];

    const res = await stream(input)
      .pipeAsync(mapAsync(async (x) => x))
      .collectAsync(toArrayAsync());

    expect(res).toStrictEqual(input);
  });
});
