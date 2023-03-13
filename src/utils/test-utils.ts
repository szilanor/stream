import {AsyncCollectorFunction, CollectorFunction} from '../types';
import {stream} from '../creators';

export type CollectorTestCase<T, O> = {
  input: Iterable<T>;
  result: O;
};

export function runTestCases<T, O>(
  collector: CollectorFunction<T, O>,
  ...testCases: CollectorTestCase<T, O>[]
): void {
  testCases.forEach(({input, result}, index) => {
    test(`Test case ${index}`, () => {
      expect(collector(input)).toStrictEqual(result);
    });
  });
}

export function runAsyncTestCases<T, O>(
  collector: AsyncCollectorFunction<T, O>,
  ...testCases: CollectorTestCase<T, O>[]
): void {
  testCases.forEach(({input, result}, index) => {
    test(`Test case ${index}`, async () => {
      expect(await collector(stream(input))).toStrictEqual(result);
    });
  });
}
