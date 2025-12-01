import { operationTest } from "./testUtils";
import { notNullOrWhitespace } from "~/operations/sync/notNullOrWhitespace";
import { notNullOrWhitespaceAsync } from "~/operations/async/notNullOrWhitespaceAsync";

describe("notNullOrWhitespace() and notNullOrWhitespaceAsync()", () => {
  operationTest(
    notNullOrWhitespace(),
    notNullOrWhitespaceAsync(),
    [
      {
        input: [],
        result: [],
      },
      {
        input: ["1", "   ", "2", undefined],
        result: ["1", "2"],
      },
    ],
  );
});
