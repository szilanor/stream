import { endWith } from "~/operations/sync/endWith";
import { operationTest } from "./testUtils";
import { endWithAsync } from "~/operations/async/endWithAsync";

describe("endWith() and endWithAsync()", () => {
  operationTest(endWith(1), endWithAsync(1), [
    {
      input: [],
      result: [1],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3, 1],
    },
  ]);
});
