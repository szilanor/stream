import {Stream} from '../../stream';
import {forEach} from './forEach';
import {empty} from '../../creators';

describe('Processor function: forEach()', () => {
  test('should call the callback function 0 times for empty Stream', () => {
    let counter = 0;
    const callback = () => {
      counter++;
      return;
    };

    empty().collect(forEach(callback));
    expect(counter).toBe(0);
  });

  test('should call the callback function for each entries', () => {
    let counter = 0;
    const callback = () => counter++;
    const entries = [1];

    new Stream(entries).collect(forEach(callback));
    expect(counter).toBe(1);
  });
});
