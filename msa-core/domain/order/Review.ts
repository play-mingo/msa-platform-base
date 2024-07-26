import { BaseCqrsDomainFactory, ToggleYn } from "domain/_base";
import { OrderKey, ReviewKey } from "./key";

export interface ReviewDetail {
  reviewImgs: string[];
  contents: string;
  reviewStar: number;
  reviewCnt1: number;
  reviewCnt2: number;
  reviewCnt3: number;
  reviewCnt4: number;
  reviewCnt5: number;
  reviewCnt6: number;
  reviewCnt7: number;
  reviewCnt8: number;
}

export type ReviewTypeOption = Review | never;
export class Review extends BaseCqrsDomainFactory {
  readonly orderKey: OrderKey;
  readonly reviewKey: ReviewKey;
  private _reviewYn: ToggleYn = ToggleYn.DEACTIVE;
  private _reviewDetail: ReviewDetail;

  constructor(orderKey: OrderKey, reviewKey: ReviewKey, reviewDetail: ReviewDetail) {
    super();
    this.orderKey = orderKey;
    this.reviewKey = reviewKey;
    this._reviewDetail = reviewDetail;
  }

  public static create(orderKey: OrderKey): Review {
    return new Review(orderKey, ReviewKey.create(), {
      reviewImgs: [],
      contents: "",
      reviewStar: 0,
      reviewCnt1: 0,
      reviewCnt2: 0,
      reviewCnt3: 0,
      reviewCnt4: 0,
      reviewCnt5: 0,
      reviewCnt6: 0,
      reviewCnt7: 0,
      reviewCnt8: 0,
    });
  }

  get detail(): Readonly<ReviewDetail> {
    return this._reviewDetail;
  }
}
