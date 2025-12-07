import { sumBy } from "~/collectors/sync/sumBy";
import { collectorTest } from "./testUtils";
import { sumByAsync } from "~/collectors/async/sumByAsync";

describe("sumBy() and sumByAsync()", () => {
  collectorTest(
    sumBy((x) => x),
    sumByAsync((x) => x),
    [
      {
        input: [],
        result: undefined,
      },
      {
        input: [1, 2, 3, 4],
        result: 10,
      },
    ],
  );
});
