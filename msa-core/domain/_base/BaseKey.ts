import { ValueObject } from "./ValueObject";

export interface IBaseKey {
  key: string;
}
export class BaseKey extends ValueObject {
  constructor(public readonly key: string) {
    super();
  }
}
