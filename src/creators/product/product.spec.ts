import { product } from "./product";
import { toArray } from "../../collectors";

describe("Creator function: zip()", () => {
  test("should return an empty Stream", () => {
    const res = product('ABCD', 'xy', (a, b) => `${a}${b}`).collect(toArray());
    expect(res).toStrictEqual(['Ax', 'Ay', 'Bx', 'By', 'Cx', 'Cy', 'Dx', 'Dy']);
  });

});
