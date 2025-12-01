import { defaultIfEmpty } from "~/operations/sync/defaultIfEmpty";
import { operationTest } from "./testUtils";
import { defaultIfEmptyAsync } from "~/operations/async/defaultIfEmptyAsync";

describe("defaultIfEmpty() and defaultIfEmptyAsync()", () => {
  const testCases = [
    {
      input: [],
      result: [1],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3],
    },
  ];

  operationTest(defaultIfEmpty(1), defaultIfEmptyAsync(1), testCases);

  operationTest(
    defaultIfEmpty(() => 1),
    defaultIfEmptyAsync(() => 1),
    testCases,
  );
});
