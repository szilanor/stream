import { lastOrDefault } from "./lastOrDefault";
import { runSyncAndAsyncCollectorTestCases } from "../../utils/test-utils";
import { lastOrDefaultAsync } from "./lastOrDefaultAsync";

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

  runSyncAndAsyncCollectorTestCases(
    lastOrDefault(5),
    lastOrDefaultAsync(5),
    defaultPredicateCases,
  );

  runSyncAndAsyncCollectorTestCases(
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

  runSyncAndAsyncCollectorTestCases(
    lastOrDefault(10, (entry) => entry % 2 === 0),
    lastOrDefaultAsync(10, (entry) => entry % 2 === 0),
    withPredicateCases,
  );

  runSyncAndAsyncCollectorTestCases(
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
