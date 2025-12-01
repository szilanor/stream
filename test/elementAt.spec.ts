import { elementAt } from "~/collectors/sync/elementAt";
import { collectorTest } from "./testUtils";
import { elementAtAsync } from "~/collectors/async/elementAtAsync";

describe("elementAt() and elementAtAsync()", () => {
  collectorTest(elementAt(0), elementAtAsync(0), [
    {
      input: [],
      result: undefined,
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
  collectorTest(elementAt(1), elementAtAsync(1), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1],
      result: undefined,
    },
  ]);
});
