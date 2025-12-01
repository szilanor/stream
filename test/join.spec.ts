import { join } from "~/collectors/sync/join";
import { collectorTest } from "./testUtils";
import { joinAsync } from "~/collectors/async/joinAsync";

describe("join() and joinAsync()", () => {
  collectorTest(join(), joinAsync(), [
    {
      input: [],
      result: "",
    },
    {
      input: [1, 2, 3, 4],
      result: "1,2,3,4",
    },
  ]);
  collectorTest(join(":"), joinAsync(":"), [
    {
      input: [],
      result: "",
    },
    {
      input: [1, 2, 3, 4],
      result: "1:2:3:4",
    },
  ]);
});
