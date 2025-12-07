import { averageBy } from "~/collectors/sync/averageBy";
import { averageByAsync } from "~/collectors/async/averageByAsync";
import { collectorTest } from "./testUtils";

describe("averageBy() and averageByAsync()", () => {
  collectorTest(
    averageBy((x) => x),
    averageByAsync((x) => x),
    [
      {
        input: [],
        result: undefined,
      },
    ],
  );
  collectorTest(
    averageBy((x) => x),
    averageByAsync((x) => x),
    [
      {
        input: [1],
        result: 1,
      },
      {
        input: [],
        result: undefined,
      },
    ],
  );
  collectorTest(
    averageBy((x) => x),
    averageByAsync((x) => x),
    [
      {
        input: [1, 1, 1],
        result: 1,
      },
      {
        input: [2, 2, 2],
        result: 2,
      },
      {
        input: [1, 2, 3],
        result: 2,
      },
      {
        input: [1, 2, 3, 4],
        result: 2.5,
      },
    ],
  );
});
