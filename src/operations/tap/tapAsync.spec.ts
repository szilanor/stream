import { Stream } from "../../stream";
import { toArray } from "../../collectors";
import { tap } from "./tap";

describe("Operation function: tap()", () => {
  test("should call a callback function after each entry", () => {
    let counter = 0;
    new Stream([1, 2, 3]).pipe(tap(() => counter++)).collect(toArray());
    expect(counter).toBe(3);
  });
});
