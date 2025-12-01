import { operationTest } from "./testUtils";
import { distinctUntilChanged } from "~/operations/sync/distinctUntilChanged";
import { distinctUntilChangedAsync } from "~/operations/async/distinctUntilChangedAsync";

describe("distinct() and distinctAsync()", () => {
  operationTest(distinctUntilChanged(), distinctUntilChangedAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 1, 2, 2, 2, 3],
      result: [1, 2, 3],
    },
    {
      input: [1, 1, 2, 2, 2, 3, 1, 2, 3],
      result: [1, 2, 3, 1, 2, 3],
    },
  ]);
});
