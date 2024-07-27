import { Stream } from "../../stream";
import { toArrayAsync } from "../../collectors";
import { tapAsync } from "./tapAsync";

describe("Operation function: tapAsync()", () => {
  test("should call a callback function after each entry", async () => {
    let counter = 0;
    await new Stream([1, 2, 3])
      .pipeAsync(
        tapAsync(() => {
          counter++;
        }),
      )
      .collectAsync(toArrayAsync());
    expect(counter).toBe(3);
  });

  test("should call a callback function after each entry from sync stream", async () => {
    let counter = 0;
    await new Stream([1, 2, 3])
      .pipeAsync(
        tapAsync(() => {
          counter++;
        }),
      )
      .collectAsync(toArrayAsync());
    expect(counter).toBe(3);
  });
});
