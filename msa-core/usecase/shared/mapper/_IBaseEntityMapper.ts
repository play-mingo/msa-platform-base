export interface IBaseEntityMapperType<Entity, Aggregate> {
  originalEntities: Map<string, Entity>;
  setOriginalEntity(key: string, originalEntity: Entity): void;
  setOriginalEntities(originalEntityMap: Map<string, Entity>): void;
  getOriginalEntity(key: string): Entity | undefined;
}

export abstract class BaseEntityMapper<Entity, Aggregate> implements IBaseEntityMapperType<Entity, Aggregate> {
  public originalEntities: Map<string, Entity> = new Map();

  public setOriginalEntity(key: string, originalEntity: Entity): void {
    this.originalEntities.set(key, originalEntity);
  }

  public setOriginalEntities(originalEntityMap: Map<string, Entity>): void {
    originalEntityMap.forEach((entity, key) => {
      this.originalEntities.set(key, entity);
    });
  }

  public getOriginalEntity(key: string): Entity | undefined {
    return this.originalEntities.get(key);
  }
}
