import { notNullOrEmpty } from "~/operations/sync/notNullOrEmpty";
import { operationTest } from "./testUtils";
import { notNullOrEmptyAsync } from "~/operations/async/notNullOrEmptyAsync";

describe("notNullOrEmpty() and notNullOrEmptyAsync()", () => {
  operationTest(notNullOrEmpty(), notNullOrEmptyAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: ["1", "", "2", [], [1], null, undefined],
      result: ["1", "2", [1]],
    },
  ]);
});
