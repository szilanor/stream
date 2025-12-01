import { distinctBy } from "~/operations/sync/distinctBy";
import { operationTest } from "./testUtils";
import { distinctByAsync } from "~/operations/async/distinctByAsync";

describe("distinctBy() and distinctByAsync()", () => {
  operationTest(distinctBy(), distinctByAsync(), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 1, 2, 2, 2, 3],
      result: [1, 2, 3],
    },
  ]);
  operationTest(distinctBy(), distinctByAsync(), [
    {
      input: [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }],
      result: [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }],
    },
  ]);
  operationTest(
    distinctBy((a, b) => a.a === b.a),
    distinctByAsync((a, b) => a.a === b.a),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [{ a: 1 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }],
        result: [{ a: 1 }, { a: 2 }, { a: 3 }],
      },
    ],
  );
});
