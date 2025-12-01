import { noop } from "~/operations/sync/noop";
import { operationTest } from "./testUtils";
import { noopAsync } from "~/operations/async/noopAsync";

describe("noop() and noopAsync()", () => {
  operationTest(noop(), noopAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3],
    },
  ]);
});
