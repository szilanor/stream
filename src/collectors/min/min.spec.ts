import { min } from "./min";
import { runSyncAndAsyncCollectorTestCases } from "../../utils/test-utils";
import { minAsync } from "./minAsync";

describe("min and minAsync", () => {
  runSyncAndAsyncCollectorTestCases(min, minAsync, [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 1,
    },
    {
      input: [1, 2, 13, 4, 0],
      result: 0,
    },
  ]);
});
