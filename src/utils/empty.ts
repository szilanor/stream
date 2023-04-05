import {toAsyncIterable} from './wrap';

export const EMPTY: Iterable<never> & AsyncIterable<never> = toAsyncIterable(
  []
);
