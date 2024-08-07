import { firstIndex } from "./firstIndex";
import { runSyncAndAsyncCollectorTestCases } from "../../utils/test-utils";
import { firstIndexAsync } from "./firstIndexAsync";

describe("firstIndex() and firstIndexAsync()", () => {
  runSyncAndAsyncCollectorTestCases(firstIndex(), firstIndexAsync(), [
    {
      input: [],
      result: -1,
    },
    {
      input: [1, 2, 3, 4],
      result: 0,
    },
  ]);
  runSyncAndAsyncCollectorTestCases(
    firstIndex((entry) => entry % 2 === 0),
    firstIndexAsync((entry) => entry % 2 === 0),
    [
      {
        input: [1, 2, 3, 4],
        result: 1,
      },
      {
        input: [1, 3],
        result: -1,
      },
    ],
  );
});
