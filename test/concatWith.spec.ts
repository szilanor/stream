import { concatWith } from "~/operations/sync/concatWith";
import { operationTest } from "./testUtils";
import { concatWithAsync } from "~/operations/async/concatWithAsync";

describe("concatWith() and concatWithAsync()", () => {
  operationTest(concatWith([4, 5], [6]), concatWithAsync([4, 5], [6]), [
    {
      input: [],
      result: [4, 5, 6],
    },
    {
      input: [1, 2, 3],
      result: [1, 2, 3, 4, 5, 6],
    },
  ]);
});
