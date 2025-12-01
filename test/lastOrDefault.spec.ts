import { lastOrDefault } from "~/collectors/sync/lastOrDefault";
import { collectorTest } from "./testUtils";
import { lastOrDefaultAsync } from "~/collectors/async/lastOrDefaultAsync";

describe("lastOrDefault() and lastOrDefaultAsync()", () => {
  const defaultPredicateCases = [
    {
      input: [],
      result: 5,
    },
    {
      input: [1, 2, 3, 4],
      result: 4,
    },
  ];

  collectorTest(
    lastOrDefault(5),
    lastOrDefaultAsync(5),
    defaultPredicateCases,
  );

  collectorTest(
    lastOrDefault(() => 5),
    lastOrDefaultAsync(() => 5),
    defaultPredicateCases,
  );

  const withPredicateCases = [
    {
      input: [],
      result: 10,
    },
    {
      input: [1, 2, 3, 4, 5],
      result: 4,
    },
    {
      input: [1, 3, 5],
      result: 10,
    },
  ];

  collectorTest(
    lastOrDefault(10, (entry) => entry % 2 === 0),
    lastOrDefaultAsync(10, (entry) => entry % 2 === 0),
    withPredicateCases,
  );

  collectorTest(
    lastOrDefault(
      () => 10,
      (entry) => entry % 2 === 0,
    ),
    lastOrDefaultAsync(
      () => 10,
      (entry) => entry % 2 === 0,
    ),
    withPredicateCases,
  );
});
