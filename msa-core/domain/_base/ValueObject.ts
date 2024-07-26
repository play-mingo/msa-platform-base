export class ValueObject {}

export const ToggleYn = { ACTIVE: "Y", DEACTIVE: "N" } as const;
export type ToggleYn = (typeof ToggleYn)[keyof typeof ToggleYn];
export const ToggleYnValues = Object.values(ToggleYn).map((value) => value);

export const DelYn = { DELETED: "Y", ACTIVE: "N" } as const;
export type DelYn = (typeof DelYn)[keyof typeof DelYn];
export const DelYnValues = Object.values(DelYn).map((value) => value);
