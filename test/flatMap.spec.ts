import { flatMap } from "~/operations/sync/flatMap";
import { operationTest } from "./testUtils";
import { flatMapAsync } from "~/operations/async/flatMapAsync";

describe("flat() and flatAsync()", () => {
  operationTest(
    flatMap((entry) => entry.a),
    flatMapAsync((entry) => entry.a),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [{ a: [1] }, { a: [2] }, { a: [3] }],
        result: [1, 2, 3],
      },
    ],
  );
  operationTest(
    flatMap((n) => (n < 0 ? [] : n % 2 === 0 ? [n] : [n - 1, 1])),
    flatMapAsync((n) => (n < 0 ? [] : n % 2 === 0 ? [n] : [n - 1, 1])),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [5, 4, -3, 20, 17, -33, -4, 18],
        result: [4, 1, 4, 20, 16, 1, 18],
      },
    ],
  );
});
