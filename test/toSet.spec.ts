import { toSet } from "~/collectors/sync/toSet";
import { collectorTest } from "./testUtils";
import { toSetAsync } from "~/collectors/async/toSetAsync";

describe("toSet() and toSetAsync()", () => {
  collectorTest(toSet(), toSetAsync(), [
    {
      input: [1, 1, 1, 1],
      result: new Set<number>([1]),
    },
    {
      input: [],
      result: new Set<number>(),
    },
    {
      input: [1, 2, 3, 4],
      result: new Set<number>([1, 2, 3, 4]),
    },
  ]);
});
