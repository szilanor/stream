import { runSyncAndAsyncOperationTestCases } from "../../utils/test-utils";
import { withIndex } from "./withIndex";
import { withIndexAsync } from "./withIndexAsync";

describe("withIndex() and withIndexAsync()", () => {
  runSyncAndAsyncOperationTestCases(withIndex(), withIndexAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: ["a", "b", "c"],
      result: [
        ["a", 0],
        ["b", 1],
        ["c", 2],
      ],
    },
  ]);
});
