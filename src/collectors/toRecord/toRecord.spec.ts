import {toRecord} from './toRecord';
import {CollectorTestCase, runTestCases} from '../../utils/test-utils';

export const testCases: CollectorTestCase<number, Record<string, number>>[] = [
  {
    input: [1, 1, 1, 1],
    result: {'1': 1},
  },
  {
    input: [],
    result: {},
  },
  {
    input: [1, 2, 3, 4],
    result: {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
    },
  },
];

describe('toRecord()', () =>
  runTestCases(
    toRecord(
      entry => entry.toString(),
      entry => entry
    ),
    ...testCases
  ));
