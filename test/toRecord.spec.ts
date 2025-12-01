import { collectorTest } from "./testUtils";
import { toRecord } from "~/collectors/sync/toRecord";
import { toRecordAsync } from "~/collectors/async/toRecordAsync";

describe("toRecord() and toRecordAsync()", () => {
  collectorTest(
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
