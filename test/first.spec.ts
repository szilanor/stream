import { first } from "~/collectors/sync/first";
import { collectorTest } from "./testUtils";
import { firstAsync } from "~/collectors/async/firstAsync";

describe("first() and firstAsync()", () => {
  collectorTest(first(), firstAsync(), [
    {
      input: [],
      result: undefined,
    },
    {
      input: [1, 2, 3, 4],
      result: 1,
    },
  ]);
  collectorTest(
    first((entry) => entry % 2 === 0),
    firstAsync((entry) => entry % 2 === 0),
    [
      {
        input: [1, 2, 3, 4],
        result: 2,
      },
      {
        input: [1, 3],
        result: undefined,
      },
    ],
  );
});
