import { forEach } from "./forEach";
import { stream } from "../../creators";

describe("forEach() and forEachAsync()", () => {
  test("should call the callback function 0 times for empty Stream", () => {
    let counter = 0;
    const callback = () => {
      counter++;
      return;
    };

    stream().collect(forEach(callback));
    expect(counter).toBe(0);
  });

  test("should call the callback function for each entries", () => {
    let counter = 0;
    const callback = () => counter++;
    const entries = [1];

    stream(entries).collect(forEach(callback));
    expect(counter).toBe(1);
  });
});
