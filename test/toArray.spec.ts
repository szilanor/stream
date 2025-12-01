import { toArray } from "~/collectors/sync/toArray";
import { collectorTest } from "./testUtils";
import { toArrayAsync } from "~/collectors/async/toArrayAsync";

describe("toArray() and toArrayAsync()", () => {
  collectorTest(toArray(), toArrayAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3, 4],
      result: [1, 2, 3, 4],
    },
    {
      input: new Set<number>(),
      result: [],
    },
  ]);
});
