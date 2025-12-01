import {
  AsyncCollectorFunction,
  AsyncOperationFunction,
  CollectorFunction,
  OperationFunction,
} from "~/types";
import { stream } from "~/creators/sync/from";
import { toArray } from "~/collectors/sync/toArray";
import { toArrayAsync } from "~/collectors/async/toArrayAsync";
import { test } from "vitest";

export type OperationTestCase<T, O = T> = {
  input: Iterable<T>;
  result: Array<O>;
};

export type CollectorTestCase<T, O> = {
  input: Iterable<T>;
  result: O;
};

export function operationTest<T, O>(
  operation: OperationFunction<T, O>,
  asyncOperation: AsyncOperationFunction<T, O>,
  testCases: OperationTestCase<T, O>[],
): void {
  test.each(testCases)(
    "Sync ($input) should return $result",
    ({ input, result }) => {
      expect(stream(input).pipe(operation).collect(toArray())).toStrictEqual(
        result,
      );
    },
  );

  test.each(testCases)(
    "Async ($input) should return $result",
    async ({ input, result }) => {
      const collected = await stream(input)
        .pipeAsync(asyncOperation)
        .collectAsync(toArrayAsync());
      expect(collected).toStrictEqual(result);
    },
  );
}

export function collectorTest<T, O>(
  collector: CollectorFunction<T, O>,
  asyncCollector: AsyncCollectorFunction<T, O>,
  testCases: CollectorTestCase<T, O>[],
): void {
  test.each(testCases)(
    "Sync ($input) should return $result",
    ({ input, result }) => {
      expect(collector(input)).toStrictEqual(result);
    },
  );

  test.each(testCases)(
    "Async ($input) should return $result",
    async ({ input, result }) => {
      const collected = await asyncCollector(stream(input));
      expect(collected).toStrictEqual(result);
    },
  );
}
