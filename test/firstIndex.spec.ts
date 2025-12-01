import { firstIndex } from "~/collectors/sync/firstIndex";
import { collectorTest } from "./testUtils";
import { firstIndexAsync } from "~/collectors/async/firstIndexAsync";

describe("firstIndex() and firstIndexAsync()", () => {
  collectorTest(firstIndex(), firstIndexAsync(), [
    {
      input: [],
      result: -1,
    },
    {
      input: [1, 2, 3, 4],
      result: 0,
    },
  ]);
  collectorTest(
    firstIndex((entry) => entry % 2 === 0),
    firstIndexAsync((entry) => entry % 2 === 0),
    [
      {
        input: [1, 2, 3, 4],
        result: 1,
      },
      {
        input: [1, 3],
        result: -1,
      },
    ],
  );
});
