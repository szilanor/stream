import { toMap } from "~/collectors/sync/toMap";
import { collectorTest } from "./testUtils";
import { toMapAsync } from "~/collectors/async/toMapAsync";

describe("toMap() and toMapAsync()", () => {
  collectorTest(
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
