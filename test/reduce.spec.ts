import { reduce } from "~/collectors/sync/reduce";
import { collectorTest } from "./testUtils";
import { reduceAsync } from "~/collectors/async/reduceAsync";

describe("reduce() and reduceAsync()", () => {
  const testCases = [
    {
      input: [],
      result: 0,
    },
    {
      input: [1, 2, 3, 4],
      result: 10,
    },
  ];

  collectorTest(
    reduce((a, b) => a + b, 0),
    reduceAsync((a, b) => a + b, 0),
    testCases,
  );

  collectorTest(
    reduce(
      (a, b) => a + b,
      () => 0,
    ),
    reduceAsync(
      (a, b) => a + b,
      () => 0,
    ),
    testCases,
  );
});
