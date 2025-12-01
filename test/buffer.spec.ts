import { buffer } from "~/operations/sync/buffer";
import { operationTest } from "./testUtils";
import { bufferAsync } from "~/operations/async/bufferAsync";

describe("buffer() and bufferAsync()", () => {
  operationTest(buffer(2), bufferAsync(2), [
    {
      input: [],
      result: [],
    },
    {
      input: [1, 2, 3, 4, 5, 6, 7],
      result: [[1, 2], [3, 4], [5, 6], [7]],
    },
  ]);
});
