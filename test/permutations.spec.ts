import { permutations } from "~/creators/sync/permutations";

describe("Creator function: permutations()", () => {
  test("should return a Stream with the permutations of the parameter", () => {
    expect([...permutations([1, 2, 3], 2)]).toStrictEqual([
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2],
    ]);
  });

  test("should return a Stream with the permutations of the parameter", () => {
    expect([...permutations([1, 2, 3])]).toStrictEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });

  test("should return a Stream with the permutations of the parameter", () => {
    expect([...permutations([1, 2, 3], 1)]).toStrictEqual([[1], [2], [3]]);
  });

  test("should return a Stream with the permutations of the parameter", () => {
    expect([...permutations([1, 2, 3], 0)]).toStrictEqual([[]]);
  });
});
