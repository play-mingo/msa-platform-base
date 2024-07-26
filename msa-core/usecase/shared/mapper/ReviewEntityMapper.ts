import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { TblOrder, TblReview, TblShop, TblShopUser } from "core/database/typerom/entities";
import { ReviewRepository } from "core/database/typerom/repositories/ReviewRepository";
import { Review, ReviewDetail } from "domain/order/Review";
import { OrderKey } from "domain/order/key";
import { ReviewKey } from "domain/order/key/ReviewKey";
import { BaseEntityMapper } from "./_IBaseEntityMapper";

interface RelationEntity {
  order: TblOrder;
  shopUser: TblShopUser;
  shop: TblShop;
}

@Injectable()
export class ReviewEntityMapper extends BaseEntityMapper<TblReview, Review> {
  constructor(private readonly reviewRepository: ReviewRepository, private readonly publisher: EventPublisher) {
    super();
  }

  private toAggregate(entity: TblReview, orderKey: OrderKey): Review {
    return new Review(orderKey, new ReviewKey(entity.key), {
      reviewImgs: entity.reviewImgs?.split(",").filter((img) => !!img) ?? [],
      contents: entity.contents as string,
      reviewStar: entity.reviewStar as number,
      reviewCnt1: entity.reviewCnt1 as number,
      reviewCnt2: entity.reviewCnt2 as number,
      reviewCnt3: entity.reviewCnt3 as number,
      reviewCnt4: entity.reviewCnt4 as number,
      reviewCnt5: entity.reviewCnt5 as number,
      reviewCnt6: entity.reviewCnt6 as number,
      reviewCnt7: entity.reviewCnt7 as number,
      reviewCnt8: entity.reviewCnt8 as number,
    });
  }

  public createEntity(reviewKey: ReviewKey, props: ReviewDetail, relationEntity: RelationEntity): TblReview {
    console.log("createEntity props");
    console.log(props);
    const entity = new TblReview();
    entity.key = reviewKey.key;
    entity.reviewImgs = props.reviewImgs.join(",") ?? "";
    entity.contents = props.contents;
    entity.reviewStar = props.reviewStar;
    entity.reviewCnt1 = props.reviewCnt1;
    entity.reviewCnt2 = props.reviewCnt2;
    entity.reviewCnt3 = props.reviewCnt3;
    entity.reviewCnt4 = props.reviewCnt4;
    entity.reviewCnt5 = props.reviewCnt5;
    entity.reviewCnt6 = props.reviewCnt6;
    entity.reviewCnt7 = props.reviewCnt7;
    entity.reviewCnt8 = props.reviewCnt8;
    entity.order = relationEntity.order;
    entity.shop = relationEntity.shop;
    entity.shopUser = relationEntity.shopUser;
    return entity;
  }

  public createAggregate(reviewKey: ReviewKey, props: ReviewDetail, orderKey: OrderKey): Review {
    return new Review(orderKey, reviewKey, {
      reviewImgs: props.reviewImgs,
      contents: props.contents,
      reviewStar: props.reviewStar,
      reviewCnt1: props.reviewCnt1,
      reviewCnt2: props.reviewCnt2,
      reviewCnt3: props.reviewCnt3,
      reviewCnt4: props.reviewCnt4,
      reviewCnt5: props.reviewCnt5,
      reviewCnt6: props.reviewCnt6,
      reviewCnt7: props.reviewCnt7,
      reviewCnt8: props.reviewCnt8,
    });
  }

  public connect({ aggregate, entity }: { aggregate: Review; entity: TblReview }, relationEntity: RelationEntity): ReviewMappedManager {
    return new ReviewMappedManager(this.reviewRepository, relationEntity, aggregate, entity);
  }

  public async connectByKey(reviewKey: ReviewKey, relationEntity: RelationEntity): Promise<ReviewMappedManager> {
    const entity: TblReview | null = await this.reviewRepository.findByKeyWithRelation(reviewKey.key);
    if (!entity) throw new Error("ReviewEntityMapper.load: entity not found");
    const aggregate = this.publisher.mergeObjectContext(this.toAggregate(entity, new OrderKey(entity.order.key)));
    return new ReviewMappedManager(this.reviewRepository, relationEntity, aggregate, entity);
  }
}

export class ReviewMappedManager {
  private readonly _reviewRepository: ReviewRepository;
  private readonly _relationEntity: RelationEntity;
  private readonly _aggregate: Review;
  private readonly _entity: TblReview;
  constructor(reviewRepository: ReviewRepository, relationEntity: RelationEntity, aggregate: Review, entity: TblReview) {
    this._reviewRepository = reviewRepository;
    this._relationEntity = relationEntity;
    this._aggregate = aggregate;
    this._entity = entity;
  }

  load(): Review {
    return this._aggregate;
  }

  private toEntity(): TblReview {
    this._entity.key = this._aggregate.reviewKey.key;
    this._entity.reviewImgs = this._aggregate.detail.reviewImgs.join(",");
    this._entity.contents = this._aggregate.detail.contents;
    this._entity.reviewStar = this._aggregate.detail.reviewStar;
    this._entity.reviewCnt1 = this._aggregate.detail.reviewCnt1;
    this._entity.reviewCnt2 = this._aggregate.detail.reviewCnt2;
    this._entity.reviewCnt3 = this._aggregate.detail.reviewCnt3;
    this._entity.reviewCnt4 = this._aggregate.detail.reviewCnt4;
    this._entity.reviewCnt5 = this._aggregate.detail.reviewCnt5;
    this._entity.reviewCnt6 = this._aggregate.detail.reviewCnt6;
    this._entity.reviewCnt7 = this._aggregate.detail.reviewCnt7;
    this._entity.reviewCnt8 = this._aggregate.detail.reviewCnt8;
    this._entity.order = this._relationEntity.order as TblOrder;
    this._entity.shop = this._relationEntity.shop as TblShop;
    this._entity.shopUser = this._relationEntity.shopUser as TblShopUser;
    return this._entity;
  }

  get entity(): Readonly<TblReview> {
    return this._entity;
  }

  public async persist(): Promise<void> {
    this.toEntity();
    await this._reviewRepository.save(this._entity);
  }
}
