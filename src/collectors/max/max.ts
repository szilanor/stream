import {maxBy} from '../maxBy';

/** Return the largest value of all entries in the Iterable */
export const max = maxBy<number>((a, b) => a - b);
