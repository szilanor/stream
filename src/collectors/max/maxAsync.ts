import {maxByAsync} from '../maxBy';

/** Return the largest value of all entries in the Iterable */
export const maxAsync = maxByAsync<number>((a, b) => a - b);
