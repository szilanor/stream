import { lastIndex } from "~/collectors/sync/lastIndex";
import { collectorTest } from "./testUtils";
import { lastIndexAsync } from "~/collectors/async/lastIndexAsync";

describe("lastIndex() and lastIndexAsync()", () => {
  collectorTest(lastIndex(), lastIndexAsync(), [
    {
      input: [],
      result: -1,
    },
    {
      input: [1, 2, 3, 4],
      result: 3,
    },
  ]);
  collectorTest(
    lastIndex((entry) => entry % 2 === 0),
    lastIndexAsync((entry) => entry % 2 === 0),
    [
      {
        input: [],
        result: -1,
      },
      {
        input: [1, 2, 3, 4, 5],
        result: 3,
      },
      {
        input: [1, 3, 5],
        result: -1,
      },
    ],
  );
});
