import { ofType } from "~/operations/sync/ofType";
import { operationTest } from "./testUtils";
import { ofTypeAsync } from "~/operations/async/ofTypeAsync";

type A = { type: "a" };
type B = { type: "b" };
type AB = A | B;

function isA(entry: AB): entry is A {
  return entry.type === "a";
}

describe("ofType() and ofTypeAsync()", () => {
  operationTest(ofType(isA), ofTypeAsync(isA), [
    {
      input: [],
      result: [],
    },
    {
      input: [{ type: "a" }, { type: "b" }, { type: "a" }],
      result: [{ type: "a" }, { type: "a" }],
    },
  ]);
});
