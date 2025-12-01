import { operationTest } from "./testUtils";
import { withIndex } from "~/operations/sync/withIndex";
import { withIndexAsync } from "~/operations/async/withIndexAsync";

describe("withIndex() and withIndexAsync()", () => {
  operationTest(withIndex(), withIndexAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: ["a", "b", "c"],
      result: [
        ["a", 0],
        ["b", 1],
        ["c", 2],
      ],
    },
  ]);
});
