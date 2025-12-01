import { compound } from "~/operations/sync/compound";
import { operationTest } from "./testUtils";
import { compoundAsync } from "~/operations/async/compoundAsync";
import { filter } from "~/operations/sync/filter";
import { map } from "~/operations/sync/map";
import { filterAsync } from "~/operations/async/filterAsync";
import { mapAsync } from "~/operations/async/mapAsync";

describe("compound() and compoundAsync()", () => {
  operationTest(
    compound(
      filter((x) => x % 2 === 0),
      map((x) => x + 1),
      map((x) => x * 2),
    ),
    compoundAsync(
      filterAsync((x) => x % 2 === 0),
      mapAsync((x) => x + 1),
      mapAsync((x) => x * 2),
    ),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [1, 2, 3],
        result: [6],
      },
    ],
  );
});
