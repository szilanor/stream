import { map } from "~/operations/sync/map";
import { operationTest } from "./testUtils";
import { mapAsync } from "~/operations/async/mapAsync";

describe("map() and mapAsync()", () => {
  operationTest(
    map((entry) => entry + 1),
    mapAsync((entry) => entry + 1),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [1, 2, 3],
        result: [2, 3, 4],
      },
    ],
  );
});
