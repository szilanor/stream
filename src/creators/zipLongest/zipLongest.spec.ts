import { zipLongest } from "./zipLongest";
import { toArray } from "../../collectors";

describe("Creator function: zipLongest()", () => {
  test("should return an empty Stream", () => {
    const res = zipLongest([], [], null, (a, b) => [a, b]).collect(toArray());
    expect(res).toStrictEqual([]);
  });

  test("should return a Stream with each entries zipped together filled with the value where missing", () => {
    const first = [1, 2, 3,];
    const second = [1, 2, 3, 4];
    const zipFunction = (a: number | string, b: number | string) => `${a}${b}`;
    const expected = ['11', '22', '33', 'x4'];

    const res = zipLongest(first, second, 'x', zipFunction).collect(toArray());
    expect(res).toStrictEqual(expected);
  });
});
