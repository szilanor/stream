import { isEmpty } from "~/collectors/sync/isEmpty";
import { collectorTest } from "./testUtils";
import { isEmptyAsync } from "~/collectors/async/isEmptyAsync";

describe("isEmpty() and isEmptyAsync()", () => {
  collectorTest(isEmpty(), isEmptyAsync(), [
    {
      input: [],
      result: true,
    },
    {
      input: [1, 2, 3, 4],
      result: false,
    },
  ]);
});
