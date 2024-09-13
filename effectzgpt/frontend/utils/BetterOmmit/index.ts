// based on the original TS Omit:
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// ...but with better type safety

export type BetterOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
