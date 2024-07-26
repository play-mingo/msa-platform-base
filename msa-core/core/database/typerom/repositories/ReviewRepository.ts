import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TblReview } from "../entities/TblReview";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";
import { DelYn } from "domain/_base";
import { IUserOrderReviewDetailResult, IUserOrderReviewListPayload, IUserOrderReviewListResult } from "./OrderRepository.interface";

@Injectable()
export class ReviewRepository extends TypeormBaseRepository<TblReview, Key<TblReview>> {
  constructor(private readonly dataDource: DataSource) {
    super(TblReview, dataDource.manager);
  }

  async findShopReviewsByShopId(shopId: number): Promise<TblReview[]> {
    return await this.findBy({
      relations: { order: true },
      where: { shop: { id: shopId }, delYn: DelYn.ACTIVE },
    });
  }

  async findByKeyWithRelation(key: string): Promise<TblReview | null> {
    return await this.findOneBy({
      where: { key },
      relations: {
        order: true,
        shop: true,
        shopUser: true,
      },
    });
  }

  async findUserOrderReviewList(args: IUserOrderReviewListPayload): Promise<IUserOrderReviewListResult> {
    const [list, totalCount] = await this.findAndCount({
      relations: { order: true },
      where: {
        shopUser: {
          id: args.shopUserId,
        },
        delYn: DelYn.ACTIVE,
      },
      order: {
        insDate: "DESC",
      },
      skip: (args.pageNum - 1) * 10,
      take: 10,
    });

    return {
      pageNum: args.pageNum,
      totalCount,
      list:
        list?.map((review) => ({
          reviewKey: review.key,
          orderKey: review.order.key,
          reviewImgs: review.reviewImgs?.split(",") || [],
          contents: review.contents as string,
          reviewStar: review.reviewStar as number,
        })) || [],
    };
  }

  async findDetailByKey(reviewKey: string): Promise<IUserOrderReviewDetailResult> {
    const review = await this.findOneBy({
      where: { key: reviewKey },
      relations: {
        order: true,
      },
    });
    if (!review) throw new Error("Review not found");

    return {
      reviewKey: review.key,
      orderKey: review.order.key,
      reviewImgs: review.reviewImgs?.split(",") || [],
      contents: review.contents as string,
      reviewStar: review.reviewStar as number,
      reviewCnt1: review.reviewCnt1 as number,
      reviewCnt2: review.reviewCnt2 as number,
      reviewCnt3: review.reviewCnt3 as number,
      reviewCnt4: review.reviewCnt4 as number,
      reviewCnt5: review.reviewCnt5 as number,
      reviewCnt6: review.reviewCnt6 as number,
      reviewCnt7: review.reviewCnt7 as number,
      reviewCnt8: review.reviewCnt8 as number,
    };
  }
}
