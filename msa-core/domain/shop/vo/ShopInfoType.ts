export const StoreType = { SAMPLE: "0", CATEGORY: "1" } as const;
export type StoreType = (typeof StoreType)[keyof typeof StoreType];
export const StoreTypeValues = Object.values(StoreType).map((value) => value);
