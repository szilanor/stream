import { maxBy } from "~/collectors/sync/maxBy";
import { collectorTest } from "./testUtils";
import { maxByAsync } from "~/collectors/async/maxByAsync";

describe("maxBy() and maxByAsync()", () => {
  collectorTest(
    maxBy((a, b) => a - b),
    maxByAsync((a, b) => a - b),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [1, 2, 3, 4],
        result: 4,
      },
      {
        input: [1, 2, 13, 4],
        result: 13,
      },
    ],
  );
  collectorTest(
    maxBy((a, b) => a.a - b.a),
    maxByAsync((a, b) => a.a - b.a),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [{ a: 4 }, { a: 1 }, { a: 2 }, { a: 3 }],
        result: { a: 4 },
      },
    ],
  );
});
