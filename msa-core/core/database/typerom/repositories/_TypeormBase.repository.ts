import { Injectable } from "@nestjs/common";
import { DelYn } from "domain/_base";
import { EntityManager, EntityTarget, FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { _BaseEntity } from "../entities/_BaseEntity";

export type Key<Entity> = FindOptionsWhere<Entity> & { key: string };

@Injectable()
export abstract class TypeormBaseRepository<Entity extends _BaseEntity, EntityKey extends Key<Entity>> {
  entityTarget: EntityTarget<Entity>;
  manager: EntityManager;

  constructor(entityTarget: EntityTarget<Entity>, manager: EntityManager) {
    this.entityTarget = entityTarget;
    this.manager = manager;
  }

  async findOneByKey(key: EntityKey): Promise<Entity | null> {
    return await this.manager.getRepository(this.entityTarget).findOneBy({ key: key.key, delYn: DelYn.ACTIVE } as FindOptionsWhere<Entity>);
  }

  async findOneByKeyWithRelation(key: EntityKey, relations: FindOptionsRelations<Entity>): Promise<Entity | null> {
    return await this.manager.getRepository(this.entityTarget).findOne({
      relations: relations,
      where: { key: key.key, delYn: DelYn.ACTIVE } as FindOptionsWhere<Entity>,
    });
  }

  async findOneByIdWithRelation(id: number, relations: FindOptionsRelations<Entity>): Promise<Entity | null> {
    return await this.manager.getRepository(this.entityTarget).findOne({
      relations: relations,
      where: { id: id, delYn: DelYn.ACTIVE } as FindOptionsWhere<Entity>,
    });
  }

  async findOneById(id: number): Promise<Entity | null> {
    return await this.manager.getRepository(this.entityTarget).findOneBy({ id, delYn: DelYn.ACTIVE } as FindOptionsWhere<Entity>);
  }

  async save(entity: Entity): Promise<Entity> {
    return await this.manager.getRepository(this.entityTarget).save(entity);
  }

  // abstract aggregateToEntity(aggregate: any): Entity;
  // abstract entityToAggregate(entity: Entity): any;

  async existBy(options: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>): Promise<boolean> {
    return await this.manager.getRepository(this.entityTarget).exists({
      where: options,
    });
  }

  // 행킹
  async rankBy(
    targetIdColumn: {
      key: keyof Entity;
      value: string | number | Date | null;
    },
    findOption: FindManyOptions<Entity>,
  ): Promise<number> {
    const result: [Partial<Entity>[], number] = await this.manager.getRepository(this.entityTarget).findAndCount(findOption);
    const index = result[0].findIndex((row) => row[targetIdColumn.key] === targetIdColumn.value);
    return index + 1;
  }

  // 카운트
  async countBy(findOption: FindOptionsWhere<Entity>): Promise<number> {
    return await this.manager.getRepository(this.entityTarget).countBy(findOption);
  }

  // 일부 정보 조회
  async findOneSelectBy<T>(selectOption: FindOptionsSelect<Entity>, findOption: FindOneOptions<Entity>): Promise<Entity | T | null> {
    findOption.select = selectOption;
    return await this.manager.getRepository(this.entityTarget).findOne(findOption);
  }

  // 일부 정보 조회
  async findSelectBy<T>(selectOption: FindOptionsSelect<Entity>, findOption: FindOneOptions<Entity>): Promise<Entity[] | T[]> {
    findOption.select = selectOption;
    return await this.manager.getRepository(this.entityTarget).find(findOption);
  }

  async findOneBy(findOption: FindOneOptions<Entity>): Promise<Entity | null> {
    return await this.manager.getRepository(this.entityTarget).findOne(findOption);
  }

  async findOneByWhere(findOptionWhere: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity | null> {
    return await this.manager.getRepository(this.entityTarget).findOneBy(findOptionWhere);
  }

  async findBy(findOption: FindManyOptions<Entity>): Promise<Entity[]> {
    return await this.manager.getRepository(this.entityTarget).find(findOption);
  }

  async findAndCount(findOption: FindManyOptions<Entity>): Promise<[Entity[], number]> {
    return await this.manager.getRepository(this.entityTarget).findAndCount(findOption);
  }

  async findByWhere(FindOptionsWhere: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity[]> {
    return await this.manager.getRepository(this.entityTarget).findBy(FindOptionsWhere);
  }

  // (부분) 업데이트
  async update(condition: FindOptionsWhere<Entity>, partialEntity: QueryDeepPartialEntity<Entity>) {
    return await this.manager.getRepository(this.entityTarget).update(condition, partialEntity);
  }

  // 저장
  async saveAll(entities: Entity[]): Promise<Entity[]> {
    return await this.manager.getRepository(this.entityTarget).save(entities);
  }
}
