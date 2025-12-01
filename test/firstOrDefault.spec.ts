import { firstOrDefault } from "~/collectors/sync/firstOrDefault";
import { collectorTest } from "./testUtils";
import { firstOrDefaultAsync } from "~/collectors/async/firstOrDefaultAsync";

describe("firstOrDefault() and firstOrDefaultAsync()", () => {
  const emptyTestCases = [
    {
      input: [],
      result: 5,
    },
    {
      input: [1, 2, 3, 4],
      result: 1,
    },
  ];

  collectorTest(
    firstOrDefault(5),
    firstOrDefaultAsync(5),
    emptyTestCases,
  );
  collectorTest(
    firstOrDefault(() => 5),
    firstOrDefaultAsync(() => 5),
    emptyTestCases,
  );

  const evenTestCases = [
    {
      input: [],
      result: 5,
    },
    {
      input: [1, 2, 3, 4],
      result: 2,
    },
    {
      input: [1, 3],
      result: 5,
    },
  ];

  collectorTest(
    firstOrDefault(5, (entry) => entry % 2 === 0),
    firstOrDefaultAsync(5, (entry) => entry % 2 === 0),
    evenTestCases,
  );
  collectorTest(
    firstOrDefault(
      () => 5,
      (entry) => entry % 2 === 0,
    ),
    firstOrDefaultAsync(
      () => 5,
      (entry) => entry % 2 === 0,
    ),
    evenTestCases,
  );
});
