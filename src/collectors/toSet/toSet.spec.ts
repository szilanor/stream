import { toSet } from "./toSet";
import { runSyncAndAsyncCollectorTestCases } from "../../utils/test-utils";
import { toSetAsync } from "./toSetAsync";

describe("toSet() and toSetAsync()", () => {
  runSyncAndAsyncCollectorTestCases(toSet(), toSetAsync(), [
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
