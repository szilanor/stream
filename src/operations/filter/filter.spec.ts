import { filter } from "./filter";
import { runSyncAndAsyncOperationTestCases } from "../../utils/test-utils";
import { filterAsync } from "./filterAsync";
import { isNotNullOrEmpty } from "../../utils";

describe("filter() and filterAsync()", () => {
  runSyncAndAsyncOperationTestCases(
    filter((entry) => entry % 2 === 0),
    filterAsync((entry) => entry % 2 === 0),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [1, 2, 3],
        result: [2],
      },
    ],
  );
  runSyncAndAsyncOperationTestCases(
    filter(isNotNullOrEmpty),
    filterAsync(isNotNullOrEmpty),
    [
      {
        input: [],
        result: [],
      },
      {
        input: ["1", null, "", undefined, []],
        result: ["1"],
      },
    ],
  );
});
