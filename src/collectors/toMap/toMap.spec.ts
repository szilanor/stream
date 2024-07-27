import { toMap } from "./toMap";
import { runSyncAndAsyncCollectorTestCases } from "../../utils/test-utils";
import { toMapAsync } from "./toMapAsync";

describe("toMap() and toMapAsync()", () => {
  runSyncAndAsyncCollectorTestCases(
    toMap(
      (entry) => entry.toString(),
      (entry) => entry,
    ),
    toMapAsync(
      (entry) => entry.toString(),
      (entry) => entry,
    ),
    [
      {
        input: [],
        result: new Map<string, number>(),
      },
      {
        input: [1, 2, 3, 4],
        result: new Map<string, number>([
          ["1", 1],
          ["2", 2],
          ["3", 3],
          ["4", 4],
        ]),
      },
      {
        input: [1, 1, 1, 1],
        result: new Map<string, number>([["1", 1]]),
      },
    ],
  );
});
