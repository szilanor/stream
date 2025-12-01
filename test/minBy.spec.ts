import { minBy } from "~/collectors/sync/minBy";
import { collectorTest } from "./testUtils";
import { minByAsync } from "~/collectors/async/minByAsync";

describe("minBy() and minByAsync()", () => {
  collectorTest(
    minBy((a, b) => a - b),
    minByAsync((a, b) => a - b),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [1, 2, 3, 4],
        result: 1,
      },
      {
        input: [1, 2, 13, 4, 0],
        result: 0,
      },
    ],
  );
  collectorTest(
    minBy((a, b) => a.a - b.a),
    minByAsync((a, b) => a.a - b.a),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [{ a: 4 }, { a: 1 }, { a: 2 }, { a: 3 }],
        result: { a: 1 },
      },
    ],
  );
});
