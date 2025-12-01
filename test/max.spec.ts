import { max } from "~/collectors/sync/max";
import { collectorTest } from "./testUtils";
import { maxAsync } from "~/collectors/async/maxAsync";

describe("max and maxAsync", () => {
  collectorTest(max, maxAsync, [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 4,
    },
    {
      input: [1, 2, 13, 4],
      result: 13,
    },
  ]);
});
