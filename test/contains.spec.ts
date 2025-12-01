import { contains } from "~/collectors/sync/contains";
import { collectorTest } from "./testUtils";
import { containsAsync } from "~/collectors/async/containsAsync";

const testEntry = { test: 1 };
const entries = [{ test: 1 }, { test: 2 }];
const entriesWithReference = [testEntry, { test: 2 }];

describe("contains() and containsAsync()", () => {
  collectorTest(contains(testEntry), containsAsync(testEntry), [
    {
      input: [],
      result: false,
    },
    {
      input: entries,
      result: false,
    },
    {
      input: entriesWithReference,
      result: true,
    },
  ]);
  collectorTest(
    contains(testEntry, (a, b) => a.test === b.test),
    containsAsync(testEntry, (a, b) => a.test === b.test),
    [
      {
        input: [],
        result: false,
      },
      {
        input: entries,
        result: true,
      },
      {
        input: entriesWithReference,
        result: true,
      },
    ],
  );
});
