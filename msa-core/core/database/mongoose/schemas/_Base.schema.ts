import { Prop } from "@nestjs/mongoose";
import { DelYn } from "domain/_base";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export class _BaseSchema extends Document {
  // _id!: any;
  @Prop({ type: String, default: () => uuidv4().split("-").join("") })
  _id!: string;

  @Prop()
  key!: string;

  @Prop()
  id!: number;

  @Prop()
  insDate!: Date;

  @Prop()
  updDate!: Date;

  @Prop()
  delYn!: DelYn;
}
