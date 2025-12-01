import { operationTest } from "./testUtils";
import { flatAsync } from "~/operations/async/flatAsync";
import { flat } from "~/operations/sync/flat";

describe("flat() and flatAsync()", () => {
  operationTest(flat(), flatAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [[1, 2, 3], [], [4], [5, 6], new Set([7])],
      result: [1, 2, 3, 4, 5, 6, 7],
    },
  ]);
});
