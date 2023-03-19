import {
  AsyncCollectorFunction,
  AsyncOperationFunction,
  CollectorFunction,
  OperationFunction,
} from '../types';
import {stream} from '../creators';
import {toArray, toArrayAsync} from '../collectors';

export type OperationTestCase<T, O = T> = {
  input: Iterable<T>;
  result: Array<O>;
};

export type CollectorTestCase<T, O> = {
  input: Iterable<T>;
  result: O;
};

export function runSyncAndAsyncOperationTestCases<T, O>(
  operation: OperationFunction<T, O>,
  asyncOperation: AsyncOperationFunction<T, O>,
  testCases: OperationTestCase<T, O>[]
): void {
  testCases.forEach(({input, result}, index) => {
    test(`Sync test case ${index}`, () => {
      expect(stream(input).pipe(operation).collect(toArray())).toStrictEqual(
        result
      );
    });
    test(`Async test case ${index}`, async () => {
      const result = await stream(input)
        .pipeAsync(asyncOperation)
        .collectAsync(toArrayAsync());
      expect(result).toStrictEqual(result);
    });
  });
}

export function runSyncAndAsyncCollectorTestCases<T, O>(
  collector: CollectorFunction<T, O>,
  asyncCollector: AsyncCollectorFunction<T, O>,
  testCases: CollectorTestCase<T, O>[]
): void {
  testCases.forEach(({input, result}, index) => {
    test(`Sync test case ${index}`, () => {
      expect(collector(input)).toStrictEqual(result);
    });
    test(`Async test case ${index}`, async () => {
      const result = await asyncCollector(stream(input));
      expect(result).toStrictEqual(result);
    });
  });
}
