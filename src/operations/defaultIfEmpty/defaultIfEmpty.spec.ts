import { defaultIfEmpty } from "./defaultIfEmpty";
import { runSyncAndAsyncOperationTestCases } from "../../utils/test-utils";
import { defaultIfEmptyAsync } from "./defaultIfEmptyAsync";

describe("defaultIfEmpty() and defaultIfEmptyAsync()", () => {
  const testCases = [
    {
      input: [],
      result: [1],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3],
    },
  ];

  runSyncAndAsyncOperationTestCases(
    defaultIfEmpty(1),
    defaultIfEmptyAsync(1),
    testCases,
  );

  runSyncAndAsyncOperationTestCases(
    defaultIfEmpty(() => 1),
    defaultIfEmptyAsync(() => 1),
    testCases,
  );
});
