import { distinctBy } from "./distinctBy";
import { runSyncAndAsyncOperationTestCases } from "../../utils/test-utils";
import { distinctByAsync } from "./distinctByAsync";

describe("distinctBy() and distinctByAsync()", () => {
  runSyncAndAsyncOperationTestCases(distinctBy(), distinctByAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 1, 2, 2, 2, 3],
      result: [1, 2, 3],
    },
  ]);
  runSyncAndAsyncOperationTestCases(distinctBy(), distinctByAsync(), [
    {
      input: [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }],
      result: [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }],
    },
  ]);
  runSyncAndAsyncOperationTestCases(
    distinctBy((a, b) => a.a === b.a),
    distinctByAsync((a, b) => a.a === b.a),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }],
        result: [{ a: 1 }, { a: 2 }, { a: 3 }],
      },
    ],
  );
});
