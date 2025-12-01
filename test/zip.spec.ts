import { zip } from "~/creators/sync/zip";
import { toArray } from "~/collectors/sync/toArray";

describe("Creator function: zip()", () => {
  test("should return an empty Stream", () => {
    const res = zip([], [], (a, b) => [a, b]).collect(toArray());
    expect(res).toStrictEqual([]);
  });

  test("should return a Stream with each entries zipped together", () => {
    const first = [1, 2, 3, 4];
    const second = [1, 2, 3, 4];
    const zipFunction = (a: number, b: number) => a + b;
    const expected = [2, 4, 6, 8];

    const res = zip(first, second, zipFunction).collect(toArray());
    expect(res).toStrictEqual(expected);
  });

  test("should return a Stream with each entries zipped together but the length of the smaller one", () => {
    const first = [1, 2];
    const second = [1, 2, 3, 4];
    const zipFunction = (a: number, b: number) => a + b;
    const expected = [2, 4];

    const res = zip(first, second, zipFunction).collect(toArray());
    expect(res).toStrictEqual(expected);
  });
});
