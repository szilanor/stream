import { min } from "~/collectors/sync/min";
import { collectorTest } from "./testUtils";
import { minAsync } from "~/collectors/async/minAsync";

describe("min and minAsync", () => {
  collectorTest(min, minAsync, [
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
