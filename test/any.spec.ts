import { any } from "~/collectors/sync/any";
import { anyAsync } from "~/collectors/async/anyAsync";
import { collectorTest } from "./testUtils";

describe("any() and anyAsync()", () => {
  collectorTest(
    any((entry) => !!entry),
    anyAsync((entry) => !!entry),
    [
      {
        input: [],
        result: false,
      },
    ],
  );
  collectorTest(any(), anyAsync(), [
    {
      input: [1],
      result: true,
    },
    {
      input: [],
      result: false,
    },
  ]);
  collectorTest(
    any((entry) => entry % 2 === 1),
    anyAsync((entry) => entry % 2 === 1),
    [
      {
        input: [1, 1, 1],
        result: true,
      },
      {
        input: [2, 2, 2],
        result: false,
      },
    ],
  );
});
