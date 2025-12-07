import { average } from "~/collectors/sync/average";
import { averageAsync } from "~/collectors/async/averageAsync";
import { collectorTest } from "./testUtils";

describe("average() and averageAsync()", () => {
  collectorTest(average(), averageAsync(), [
    {
      input: [],
      result: undefined,
    },
  ]);
  collectorTest(average(), averageAsync(), [
    {
      input: [1],
      result: 1,
    },
    {
      input: [],
      result: undefined,
    },
  ]);
  collectorTest(average(), averageAsync(), [
    {
      input: [1, 1, 1],
      result: 1,
    },
    {
      input: [2, 2, 2],
      result: 2,
    },
    {
      input: [1, 2, 3],
      result: 2,
    },
    {
      input: [1, 2, 3, 4],
      result: 2.5,
    },
  ]);
});
