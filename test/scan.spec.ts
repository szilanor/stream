import { scan } from "~/operations/sync/scan";
import { operationTest } from "./testUtils";
import { scanAsync } from "~/operations/async/scanAsync";

describe("scan() and scanAsync()", () => {
  const testCases = [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3, 4],
      result: [1, 3, 6, 10],
    },
  ];

  operationTest(
    scan((a, b) => a + b, 0),
    scanAsync((a, b) => a + b, 0),
    testCases,
  );

  operationTest(
    scan(
      (a, b) => a + b,
      () => 0,
    ),
    scanAsync(
      (a, b) => a + b,
      () => 0,
    ),
    testCases,
  );
});
