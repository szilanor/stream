import { noop } from "./noop";
import { runSyncAndAsyncOperationTestCases } from "../../utils/test-utils";
import { noopAsync } from "./noopAsync";

describe("noop() and noopAsync()", () => {
  runSyncAndAsyncOperationTestCases(noop(), noopAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3],
    },
  ]);
});
