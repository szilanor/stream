import { count } from "~/collectors/sync/count";
import { collectorTest } from "./testUtils";
import { countAsync } from "~/collectors/async/countAsync";

describe("count() and countAsync()", () => {
  collectorTest(count(), countAsync(), [
    {
      input: [],
      result: 0,
    },
    {
      input: [1],
      result: 1,
    },
    {
      input: new Set([1]),
      result: 1,
    },
  ]);
  collectorTest(
    count((entry) => entry % 2 === 0),
    countAsync((entry) => entry % 2 === 0),
    [
      {
        input: [],
        result: 0,
      },
      {
        input: [1, 2, 3],
        result: 1,
      },
      {
        input: [1, 3, 5],
        result: 0,
      },
    ],
  );
});
