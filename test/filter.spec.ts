import { filter } from "~/operations/sync/filter";
import { operationTest } from "./testUtils";
import { filterAsync } from "~/operations/async/filterAsync";
import { isNotNullOrEmpty } from "~/utils";

describe("filter() and filterAsync()", () => {
  operationTest(
    filter((entry) => entry % 2 === 0),
    filterAsync((entry) => entry % 2 === 0),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [1, 2, 3],
        result: [2],
      },
    ],
  );
  operationTest(filter(isNotNullOrEmpty), filterAsync(isNotNullOrEmpty), [
    {
      input: [],
      result: [],
    },
    {
      input: ["1", null, "", undefined, []],
      result: ["1"],
    },
  ]);
});
