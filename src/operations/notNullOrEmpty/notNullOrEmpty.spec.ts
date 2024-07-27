import { notNullOrEmpty } from "./notNullOrEmpty";
import { runSyncAndAsyncOperationTestCases } from "../../utils/test-utils";
import { notNullOrEmptyAsync } from "./notNullOrEmptyAsync";

describe("notNullOrEmpty() and notNullOrEmptyAsync()", () => {
  runSyncAndAsyncOperationTestCases(notNullOrEmpty(), notNullOrEmptyAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: ["1", "", "2", [], [1], null, undefined],
      result: ["1", "2", [1]],
    },
  ]);
});
