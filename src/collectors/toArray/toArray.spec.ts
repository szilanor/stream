import { toArray } from "./toArray";
import { runSyncAndAsyncCollectorTestCases } from "../../utils/test-utils";
import { toArrayAsync } from "./toArrayAsync";

describe("toArray() and toArrayAsync()", () => {
  runSyncAndAsyncCollectorTestCases(toArray(), toArrayAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3, 4],
      result: [1, 2, 3, 4],
    },
    {
      input: new Set<number>(),
      result: [],
    },
  ]);
});
