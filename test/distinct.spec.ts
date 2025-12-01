import { distinct } from "~/operations/sync/distinct";
import { operationTest } from "./testUtils";
import { distinctAsync } from "~/operations/async/distinctAsync";

describe("distinct() and distinctAsync()", () => {
  operationTest(distinct(), distinctAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 1, 2, 2, 2, 3],
      result: [1, 2, 3],
    },
  ]);
});
