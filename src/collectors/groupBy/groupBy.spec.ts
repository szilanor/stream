import { groupBy } from "./groupBy";
import { runSyncAndAsyncCollectorTestCases } from "../../utils/test-utils";
import { groupByAsync } from "./groupByAsync";

describe("groupBy() and groupByAsync()", () => {
  runSyncAndAsyncCollectorTestCases(
    groupBy((entry) => (entry % 2 === 0 ? "even" : "odd")),
    groupByAsync((entry) => (entry % 2 === 0 ? "even" : "odd")),
    [
      {
        input: [],
        result: new Map<string, number[]>(),
      },
      {
        input: [1, 2, 3, 4],
        result: new Map<string, number[]>([
          ["odd", [1, 3]],
          ["even", [2, 4]],
        ]),
      },
    ],
  );
});
