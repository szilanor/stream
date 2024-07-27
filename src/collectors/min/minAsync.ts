import { minByAsync } from "../minBy";

/** Return the smallest value of all entries in the Iterable */
export const minAsync = minByAsync<number>((a, b) => a - b);
