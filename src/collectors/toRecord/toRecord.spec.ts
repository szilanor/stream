import { runSyncAndAsyncCollectorTestCases } from "../../utils/test-utils";
import { toRecord } from "./toRecord";
import { toRecordAsync } from "./toRecordAsync";

describe("toRecord() and toRecordAsync()", () => {
  runSyncAndAsyncCollectorTestCases(
    toRecord(
      (entry) => entry.toString(),
      (entry) => entry,
    ),
    toRecordAsync(
      (entry) => entry.toString(),
      (entry) => entry,
    ),
    [
      {
        input: [1, 1, 1, 1],
        result: { "1": 1 },
      },
      {
        input: [],
        result: {},
      },
      {
        input: [1, 2, 3, 4],
        result: {
          "1": 1,
          "2": 2,
          "3": 3,
          "4": 4,
        },
      },
    ],
  );
});
