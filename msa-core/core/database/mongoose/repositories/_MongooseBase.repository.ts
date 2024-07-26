import mongoose, { HydratedDocument, Model } from "mongoose";
import { _BaseSchema } from "../schemas/_Base.schema";

export abstract class MongooseBaseRepository<T extends _BaseSchema> {
  private model: Model<HydratedDocument<T>>;

  constructor(model: Model<HydratedDocument<T>>) {
    this.model = model;
  }

  static mongooseId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async save(data: Partial<T>) {
    return await this.model.findOneAndUpdate({ _id: data._id }, { ...data, updDate: new Date() }, { upsert: true, new: true });
  }

  async saveByKey(data: Partial<T>) {
    return await this.model.findOneAndUpdate({ key: data.key }, { ...data, updDate: new Date() }, { upsert: true, new: true });
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findOneById(id: string): Promise<T> {
    const schema = await this.model.findById(id).exec();
    if (!schema) throw new Error("Schema Not Found");
    return schema;
  }

  async findOneByKey(key: string): Promise<T> {
    const schema = await this.model.findOne({ key }).exec();
    if (!schema) throw new Error("Schema Not Found");
    return schema;
  }
}
