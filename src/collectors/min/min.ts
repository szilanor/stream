import { minBy } from "../minBy";

/** Return the smallest value of all entries in the Iterable */
export const min = minBy<number>((a, b) => a - b);
