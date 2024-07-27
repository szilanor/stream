import { runSyncAndAsyncOperationTestCases } from "../../utils/test-utils";
import { distinctUntilChanged } from "./distinctUntilChanged";
import { distinctUntilChangedAsync } from "./distinctUntilChangedAsync";

describe("distinct() and distinctAsync()", () => {
  runSyncAndAsyncOperationTestCases(
    distinctUntilChanged(),
    distinctUntilChangedAsync(),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [1, 1, 2, 2, 2, 3],
        result: [1, 2, 3],
      },
      {
        input: [1, 1, 2, 2, 2, 3, 1, 2, 3],
        result: [1, 2, 3, 1, 2, 3],
      },
    ],
  );
});
