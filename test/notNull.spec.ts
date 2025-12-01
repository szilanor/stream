import { notNull } from "~/operations/sync/notNull";
import { operationTest } from "./testUtils";
import { notNullAsync } from "~/operations/async/notNullAsync";

describe("notNull() and notNullAsync()", () => {
  operationTest(notNull(), notNullAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3],
    },
    {
      input: [1, 2, 3, null, undefined],
      result: [1, 2, 3],
    },
  ]);
});
