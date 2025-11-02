import { cycle } from "./cycle";
import { toArray } from "../../collectors";
import { take } from "../../operations";

describe("Creator function: cycle()", () => {
  test("should return the input 3 times after taking 9 elements from it", () => {
    const input = [1, 2, 3];
    const expected = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    const res = cycle(input).pipe(take(9)).collect(toArray());
    expect(res).toStrictEqual(expected);
  });
});
