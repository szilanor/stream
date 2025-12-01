import { partition } from "~/collectors/sync/partition";
import { collectorTest } from "./testUtils";
import { partitionAsync } from "~/collectors/async/partitionAsync";

describe("partition() and partitionAsync()", () => {
  collectorTest(
    partition((entry) => entry % 2 === 1),
    partitionAsync((entry) => entry % 2 === 1),
    [
      {
        input: [],
        result: [[], []],
      },
      {
        input: [1, 1, 1],
        result: [[1, 1, 1], []],
      },
      {
        input: [1, 2, 1],
        result: [[1, 1], [2]],
      },
    ],
  );
});
