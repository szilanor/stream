import { falsy } from "~/operations/sync/falsy";
import { operationTest } from "./testUtils";
import { falsyAsync } from "~/operations/async/falsyAsync";

describe("falsy() and falsyAsync()", () => {
  operationTest<unknown, unknown>(falsy(), falsyAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3, false, "", 0, -0, null, undefined, NaN],
      result: [false, "", 0, -0, null, undefined, NaN],
    },
  ]);
});
