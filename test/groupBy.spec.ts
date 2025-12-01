import { groupBy } from "~/collectors/sync/groupBy";
import { collectorTest } from "./testUtils";
import { groupByAsync } from "~/collectors/async/groupByAsync";

describe("groupBy() and groupByAsync()", () => {
  collectorTest(
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
