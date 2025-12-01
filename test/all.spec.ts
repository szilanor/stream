import { all } from "~/collectors/sync/all";
import { allAsync } from "~/collectors/async/allAsync";
import { collectorTest } from "./testUtils";

describe("all() and allAsync()", () => {
  collectorTest(
    all((entry) => !!entry),
    allAsync((entry) => !!entry),
    [
      {
        input: [],
        result: true,
      },
    ],
  );
  collectorTest(
    all((entry) => entry % 2 === 1),
    allAsync((entry) => entry % 2 === 1),
    [
      {
        input: [1, 1, 1],
        result: true,
      },
      {
        input: [1, 2, 1],
        result: false,
      },
    ],
  );
});
