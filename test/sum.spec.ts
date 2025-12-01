import { sum } from "~/collectors/sync/sum";
import { collectorTest } from "./testUtils";
import { sumAsync } from "~/collectors/async/sumAsync";

describe("sum() and sumAsync()", () => {
  collectorTest(sum(), sumAsync(), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 10,
    },
  ]);
});
