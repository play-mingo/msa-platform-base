export interface IBaseRepository<Entity> {
  idxColumnKey: string;
  nextId: () => Promise<number>;
  findAll: () => Promise<Entity[]>;
  findOne: (id: number) => Promise<Entity | null>;
  save: (entity: Entity) => Promise<Entity>;
  create: (entity: Entity) => Promise<Entity>;
  remove: (id: number) => Promise<boolean>;
}
