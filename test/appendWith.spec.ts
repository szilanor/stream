import { appendWith } from "~/operations/sync/appendWith";
import { appendWithAsync } from "~/operations/async/appendWithAsync";
import { operationTest } from "./testUtils";

describe("appendWith() and appendWithAsync()", () => {
  operationTest(appendWith([4, 5], [6]), appendWithAsync([4, 5], [6]), [
    {
      input: [],
      result: [4, 5, 6],
    },
    {
      input: [1, 2, 3],
      result: [4, 5, 6, 1, 2, 3],
    },
  ]);
});
