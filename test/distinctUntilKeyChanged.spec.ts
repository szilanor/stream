import { operationTest } from "./testUtils";
import { distinctUntilKeyChanged } from "~/operations/sync/distinctUntilKeyChanged";
import { distinctUntilKeyChangedAsync } from "~/operations/async/distinctUntilKeyChangedAsync";

describe("distinct() and distinctAsync()", () => {
  operationTest(
    distinctUntilKeyChanged("a"),
    distinctUntilKeyChangedAsync("a"),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [
          { a: 1 },
          { a: 1 },
          { a: 2 },
          { a: 2 },
          { a: 2 },
          { a: 3 },
          { a: 1 },
        ],
        result: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }],
      },
    ],
  );
  operationTest(
    distinctUntilKeyChanged("b", (a, b) => a.a === b.a),
    distinctUntilKeyChangedAsync("b", (a, b) => a.a === b.a),
    [
      {
        input: [],
        result: [],
      },
      {
        input: [
          { b: { a: 1 } },
          { b: { a: 1 } },
          { b: { a: 2 } },
          { b: { a: 2 } },
          { b: { a: 2 } },
          { b: { a: 3 } },
          { b: { a: 1 } },
        ],
        result: [
          { b: { a: 1 } },
          { b: { a: 2 } },
          { b: { a: 3 } },
          { b: { a: 1 } },
        ],
      },
    ],
  );
});
