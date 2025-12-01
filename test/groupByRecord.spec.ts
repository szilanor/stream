import { groupByRecord } from "~/collectors/sync/groupByRecord";
import { collectorTest } from "./testUtils";
import { groupByRecordAsync } from "~/collectors/async/groupByRecordAsync";

describe("groupByRecord() and groupByRecordAsync()", () => {
  collectorTest(
    groupByRecord((entry) => (entry % 2 === 0 ? "even" : "odd")),
    groupByRecordAsync((entry) => (entry % 2 === 0 ? "even" : "odd")),
    [
      {
        input: [],
        result: {},
      },
      {
        input: [1, 2, 3, 4],
        result: {
          odd: [1, 3],
          even: [2, 4],
        },
      },
    ],
  );
});
