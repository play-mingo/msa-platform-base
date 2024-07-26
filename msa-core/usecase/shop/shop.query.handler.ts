import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {
  calculateAgeRange,
  OrderRepository,
  ShopAdminRepository,
  ShopProductRepository,
  ShopRepository,
  ShopUserRepository,
} from "core/database/typerom/repositories";
import { ReviewRepository } from "core/database/typerom/repositories/ReviewRepository";
import { default as dayjs } from "dayjs";
import { OrderType } from "domain/order/vo/OrderStatus";
import { ShopAutoUpdateType, ShopProductCategory, ShopProductPriceType, ShopProductType, ToggleYn } from "domain/shop/vo";
import { openWeeks } from "usecase/shared/mapper/ShopEntityMapper";
import { jsonToshopProductItem } from "usecase/shared/mapper/ShopProductEntityMapper";
import {
  ShopFloristGetSummaryQuery,
  ShopFloristMypageQuery,
  ShopFloristOrderOptionQuery,
  ShopFloristShopDetailQuery,
  ShopFloristShopProductQuery,
  ShopFloristShopReviewQuery,
  ShopFloristShopUserDetailQuery,
  ShopFloristShopUserListQuery,
  ShopFloristShopUserQuery,
  ShopUserShopDetailQuery,
  ShopUserShopProductQuery,
  ShopUserShopReviewQuery,
} from "./shop.query";
import {
  ICategoryProductResult,
  IFloristMypageResult,
  IFloristOrderOptionResult,
  IFloristShopDetailResult,
  IFloristShopProductResult,
  IFloristShopReviewResult,
  IFloristShopUserDetailResult,
  IFloristShopUserListResult,
  IFloristShopUserResult,
  IFloristSummaryResult,
  ISampleProductResult,
  IUserShopDetailResult,
  IUserShopProductResult,
  IUserShopReviewResult,
  ProductItem,
} from "./shop.result";

@QueryHandler(ShopFloristGetSummaryQuery)
export class ShopFloristGetSummaryQueryHandler implements IQueryHandler<ShopFloristGetSummaryQuery, IFloristSummaryResult> {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(query: ShopFloristGetSummaryQuery): Promise<IFloristSummaryResult> {
    console.log(query);
    console.log(query.shopKey);
    console.log(query.shopKey.key);
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    const shopUserCount = await this.shopUserRepository.countByShopId(shopEntity?.id as number);
    const shopOrderTodaySummery = await this.orderRepository.getShopOrderTodaySummery(shopEntity?.id as number);
    const shopOrderThisMonthSummery = await this.orderRepository.getShopOrderThisMonthSummery(shopEntity?.id as number);

    return {
      shopLink: shopEntity?.shopLink as string,
      shopName: shopEntity?.shopName as string,
      userCnt: shopUserCount,
      today: {
        todayViewCnt: shopEntity?.todayViewCnt ?? 0,
        productCreatingCnt: shopOrderTodaySummery.productCreatingCnt,
        pickupReadyCnt: shopOrderTodaySummery.pickupReadyCnt,
        completedCnt: shopOrderTodaySummery.completedCnt,
        consultingCnt: shopOrderTodaySummery.consultingCnt,
        quickOrderCnt: shopOrderTodaySummery.quickOrderCnt,
      },
      month: shopOrderThisMonthSummery,
    };
  }
}

@QueryHandler(ShopFloristShopDetailQuery)
export class ShopFloristShopDetail implements IQueryHandler<ShopFloristShopDetailQuery, IFloristShopDetailResult> {
  constructor(private readonly shopRepository: ShopRepository) {}
  async execute(query: ShopFloristShopDetailQuery): Promise<IFloristShopDetailResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    return {
      shopImgPath: shopEntity?.shopImgPath as string,
      shopName: shopEntity?.shopName as string,
      shopPhone: shopEntity?.shopPhone as string,
      shopAddr: shopEntity?.shopAddr as string,
      shopAddrDetail: shopEntity?.shopAddrDetail as string,
      shopAddrPostCode: shopEntity?.shopAddrPostCode as string,
      shopLat: shopEntity?.shopLat as number,
      shopLng: shopEntity?.shopLng as number,
      openWeek: openWeeks((shopEntity?.holidayWeek ?? "") as string),
      shopInfoDesc: shopEntity?.shopInfoDesc as string,
      shopStartTime: shopEntity?.shopStartTime as string,
      shopEndTime: shopEntity?.shopEndTime as string,
    };
  }
}

@QueryHandler(ShopFloristShopProductQuery)
export class ShopFloristShopProduct implements IQueryHandler<ShopFloristShopProductQuery, IFloristShopProductResult> {
  constructor(private readonly shopRepository: ShopRepository, private readonly shopProductRepository: ShopProductRepository) {}
  async execute(query: ShopFloristShopProductQuery): Promise<IFloristShopProductResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    const shopProducts = await this.shopProductRepository.findShopProductsByShopId(shopEntity?.id as number);
    return shopProducts.map((shopProduct) => {
      if (shopProduct.productType === ShopProductType.SAMPLE) {
        const sampleProduct: ISampleProductResult = {
          key: shopProduct.key as string,
          no: shopProduct.no as number,
          productType: ShopProductType.SAMPLE,
          product: {
            productName: shopProduct.productName as string,
            productCategory: shopProduct.productCategory as ShopProductCategory,
            productPrice: shopProduct.productPrice as number,
            contents: shopProduct.contents as string,
            productImgPaths: shopProduct.productImgPath?.split(",") as string[],
            autoUpdateType: shopProduct.autoUpdateType as ShopAutoUpdateType,
            productPriceType: shopProduct.productPriceType as ShopProductPriceType,
            productPriceStart: shopProduct.productPriceStart as number,
            productPriceEnd: shopProduct.productPriceEnd as number,
            quickPurchaseYn: shopProduct.quickPurchaseYn as ToggleYn,
            consultingYn: shopProduct.consultingYn as ToggleYn,
            deliveryYn: shopProduct.deliveryYn as ToggleYn,
          },
        };
        return sampleProduct;
      }
      if (shopProduct.productType === ShopProductType.CATEGORY) {
        const categoryProduct: ICategoryProductResult = {
          key: shopProduct.key as string,
          no: shopProduct.no as number,
          productType: ShopProductType.CATEGORY,
          product: {
            productCategory: shopProduct.productCategory as ShopProductCategory,
            productItems: jsonToshopProductItem(shopProduct.productItems) as ProductItem[],
            quickPurchaseYn: shopProduct.quickPurchaseYn as ToggleYn,
            consultingYn: shopProduct.consultingYn as ToggleYn,
            deliveryYn: shopProduct.deliveryYn as ToggleYn,
          },
        };
        return categoryProduct;
      }
      throw new Error("Not supported product type");
    });
  }
}

@QueryHandler(ShopFloristShopReviewQuery)
export class ShopFloristShopReview implements IQueryHandler<ShopFloristShopReviewQuery, IFloristShopReviewResult> {
  constructor(private readonly shopRepository: ShopRepository, private readonly reviewRepository: ReviewRepository) {}
  async execute(query: ShopFloristShopReviewQuery): Promise<IFloristShopReviewResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    const shopReviewEntities = await this.reviewRepository.findShopReviewsByShopId(shopEntity?.id as number);
    return shopReviewEntities.map((shopReview) => ({
      reviewImg: shopReview.reviewImgs as string,
      insDate: dayjs(shopReview.insDate).format("YYYY.MM.DD") as string,
      reviewStar: shopReview.reviewStar as number,
      contents: shopReview.contents as string,
      productName: (shopReview.order.orderProductName ?? "") as string,
    }));
  }
}

@QueryHandler(ShopFloristShopUserListQuery)
export class ShopFloristShopUserList implements IQueryHandler<ShopFloristShopUserListQuery, IFloristShopUserListResult> {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  execute(query: ShopFloristShopUserListQuery): Promise<IFloristShopUserListResult> {
    throw new Error("Method not implemented.");
  }
}

@QueryHandler(ShopFloristMypageQuery)
export class ShopFloristMypage implements IQueryHandler<ShopFloristMypageQuery, IFloristMypageResult> {
  constructor(private readonly shopRepository: ShopRepository, private readonly shopAdminRepository: ShopAdminRepository) {}
  async execute(query: ShopFloristMypageQuery): Promise<IFloristMypageResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    const shopAdminEntity = await this.shopAdminRepository.findOneByShopId(shopEntity?.id as number);
    return {
      authId: query.authId,
      shopAdminName: shopAdminEntity?.shopAdminName as string,
      shopName: shopEntity?.shopName as string,
      shopLink: shopEntity?.shopLink as string,
    };
  }
}

@QueryHandler(ShopFloristOrderOptionQuery)
export class ShopFloristOrderOption implements IQueryHandler<ShopFloristOrderOptionQuery, IFloristOrderOptionResult> {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  execute(query: ShopFloristOrderOptionQuery): Promise<IFloristOrderOptionResult> {
    throw new Error("Method not implemented.");
  }
}

@QueryHandler(ShopFloristShopUserQuery)
export class ShopFloristShopUser implements IQueryHandler<ShopFloristShopUserQuery, IFloristShopUserResult> {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(query: ShopFloristShopUserQuery): Promise<IFloristShopUserResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    const shopUserEntities = await this.shopUserRepository.findByShopId(shopEntity?.id as number);
    return shopUserEntities.map((shopUser) => ({
      key: shopUser.key as string,
      shopUserName: shopUser.shopUserName as string,
      shopUserPhone: shopUser.shopUserPhone as string,
      shopUserAge: shopUser.shopUserBirth ? (calculateAgeRange(shopUser.shopUserBirth ?? "").toString() as string) : "",
      shopUserGender: shopUser.shopUserGender as string,
      orderCnt: shopUser.orderCnt as number,
    }));
  }
}

@QueryHandler(ShopFloristShopUserDetailQuery)
export class ShopFloristShopUserDetail implements IQueryHandler<ShopFloristShopUserDetailQuery, IFloristShopUserDetailResult> {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(query: ShopFloristShopUserDetailQuery): Promise<IFloristShopUserDetailResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    const shopUserEntity = await this.shopUserRepository.findOneByShopId(shopEntity?.id as number);
    const orderEntities = await this.orderRepository.findByShopUserId(shopUserEntity?.id as number);
    return {
      key: shopUserEntity?.key as string,
      shopUserName: shopUserEntity?.shopUserName as string,
      shopUserPhone: shopUserEntity?.shopUserPhone as string,
      shopUserAge: shopUserEntity?.shopUserBirth ? (calculateAgeRange(shopUserEntity.shopUserBirth).toString() as string) : "",
      shopUserGender: shopUserEntity?.shopUserGender as string,
      orderCnt: shopUserEntity?.orderCnt as number,
      totalOrderPrice: orderEntities?.map((order) => order.orderPrice as number).reduce((acc, cur) => acc + cur, 0) as number,
      orders:
        orderEntities?.map((order) => ({
          orderTargetDate: dayjs(order.orderTargetDate).format("YYYY-MM-DD") as string,
          productName: order.orderProductName as string,
          productPrice: order.orderPrice as number,
          orderType: order.orderType as OrderType,
        })) ?? [],
    };
  }
}

@QueryHandler(ShopUserShopDetailQuery)
export class ShopUserShopDetail implements IQueryHandler<ShopUserShopDetailQuery, IUserShopDetailResult> {
  constructor(private readonly shopRepository: ShopRepository) {}
  async execute(query: ShopFloristShopDetailQuery): Promise<IUserShopDetailResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    return {
      shopImgPath: shopEntity?.shopImgPath as string,
      shopName: shopEntity?.shopName as string,
      shopPhone: shopEntity?.shopPhone as string,
      shopAddr: shopEntity?.shopAddr as string,
      shopAddrDetail: shopEntity?.shopAddrDetail as string,
      shopAddrPostCode: shopEntity?.shopAddrPostCode as string,
      shopLat: shopEntity?.shopLat as number,
      shopLng: shopEntity?.shopLng as number,
      openWeek: openWeeks((shopEntity?.holidayWeek ?? "") as string),
      shopInfoDesc: shopEntity?.shopInfoDesc as string,
      shopStartTime: shopEntity?.shopStartTime as string,
      shopEndTime: shopEntity?.shopEndTime as string,
    };
  }
}

@QueryHandler(ShopUserShopProductQuery)
export class ShopUserShopProduct implements IQueryHandler<ShopUserShopProductQuery, IUserShopProductResult> {
  constructor(private readonly shopRepository: ShopRepository, private readonly shopProductRepository: ShopProductRepository) {}
  async execute(query: ShopFloristShopProductQuery): Promise<IUserShopProductResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    const shopProducts = await this.shopProductRepository.findShopProductsByShopId(shopEntity?.id as number);
    return shopProducts.map((shopProduct) => {
      if (shopProduct.productType === ShopProductType.SAMPLE) {
        const sampleProduct: ISampleProductResult = {
          key: shopProduct.key as string,
          no: shopProduct.no as number,
          productType: ShopProductType.SAMPLE,
          product: {
            productName: shopProduct.productName as string,
            productCategory: shopProduct.productCategory as ShopProductCategory,
            productPrice: shopProduct.productPrice as number,
            contents: shopProduct.contents as string,
            productImgPaths: shopProduct.productImgPath?.split(",") as string[],
            autoUpdateType: shopProduct.autoUpdateType as ShopAutoUpdateType,
            productPriceType: shopProduct.productPriceType as ShopProductPriceType,
            productPriceStart: shopProduct.productPriceStart as number,
            productPriceEnd: shopProduct.productPriceEnd as number,
            quickPurchaseYn: shopProduct.quickPurchaseYn as ToggleYn,
            consultingYn: shopProduct.consultingYn as ToggleYn,
            deliveryYn: shopProduct.deliveryYn as ToggleYn,
          },
        };
        return sampleProduct;
      }
      if (shopProduct.productType === ShopProductType.CATEGORY) {
        const categoryProduct: ICategoryProductResult = {
          key: shopProduct.key as string,
          no: shopProduct.no as number,
          productType: ShopProductType.CATEGORY,
          product: {
            productCategory: shopProduct.productCategory as ShopProductCategory,
            productItems: jsonToshopProductItem(shopProduct.productItems) as ProductItem[],
            quickPurchaseYn: shopProduct.quickPurchaseYn as ToggleYn,
            consultingYn: shopProduct.consultingYn as ToggleYn,
            deliveryYn: shopProduct.deliveryYn as ToggleYn,
          },
        };
        return categoryProduct;
      }
      throw new Error("Not supported product type");
    });
  }
}

@QueryHandler(ShopUserShopReviewQuery)
export class ShopUserShopReview implements IQueryHandler<ShopUserShopReviewQuery, IUserShopReviewResult> {
  constructor(private readonly shopRepository: ShopRepository, private readonly reviewRepository: ReviewRepository) {}
  async execute(query: ShopFloristShopReviewQuery): Promise<IUserShopReviewResult> {
    const shopEntity = await this.shopRepository.findOneByKey(query.shopKey);
    const shopReviewEntities = await this.reviewRepository.findShopReviewsByShopId(shopEntity?.id as number);
    return shopReviewEntities.map((shopReview) => ({
      reviewImg: shopReview.reviewImgs as string,
      insDate: dayjs(shopReview.insDate).format("YYYY.MM.DD") as string,
      reviewStar: shopReview.reviewStar as number,
      contents: shopReview.contents as string,
      productName: (shopReview.order.orderProductName ?? "") as string,
    }));
  }
}

export const ShopQueryHandlers = [
  ShopFloristGetSummaryQueryHandler,
  ShopFloristShopDetail,
  ShopFloristShopProduct,
  ShopFloristShopReview,
  ShopFloristShopUserList,
  ShopFloristMypage,
  ShopFloristOrderOption,
  ShopFloristShopUser,
  ShopFloristShopUserDetail,
  ShopUserShopDetail,
  ShopUserShopProduct,
  ShopUserShopReview,
];
