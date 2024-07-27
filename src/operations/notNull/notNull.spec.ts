import { notNull } from "./notNull";
import { runSyncAndAsyncOperationTestCases } from "../../utils/test-utils";
import { notNullAsync } from "./notNullAsync";

describe("notNull() and notNullAsync()", () => {
  runSyncAndAsyncOperationTestCases(notNull(), notNullAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3],
    },
    {
      input: [1, 2, 3, null, undefined],
      result: [1, 2, 3],
    },
  ]);
});
