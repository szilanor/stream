import { last } from "~/collectors/sync/last";
import { collectorTest } from "./testUtils";
import { lastAsync } from "~/collectors/async/lastAsync";

describe("last() and lastAsync()", () => {
  collectorTest(last(), lastAsync(), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 4,
    },
  ]);
  collectorTest(
    last((entry) => entry % 2 === 0),
    lastAsync((entry) => entry % 2 === 0),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [1, 2, 3, 4, 5],
        result: 4,
      },
      {
        input: [1, 3, 5],
        result: undefined,
      },
    ],
  );
});
