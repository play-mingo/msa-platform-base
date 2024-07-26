import { ShopKey } from "domain/shop/key";

export class ShopFloristGetSummaryQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristSummaryQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristShopDetailQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristShopProductQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristShopReviewQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristShopUserListQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristMypageQuery {
  constructor(public readonly shopKey: ShopKey, public readonly authId: string) {}
}

export class ShopFloristOrderOptionQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristShopUserQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristShopUserDetailQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopUserShopDetailQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopUserShopProductQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopUserShopReviewQuery {
  constructor(public readonly shopKey: ShopKey) {}
}

export const ShopQueries = [
  ShopFloristGetSummaryQuery,
  ShopFloristSummaryQuery,
  ShopFloristShopDetailQuery,
  ShopFloristShopProductQuery,
  ShopFloristShopReviewQuery,
  ShopFloristShopUserListQuery,
  ShopFloristMypageQuery,
  ShopFloristOrderOptionQuery,
  ShopFloristShopUserQuery,
  ShopFloristShopUserDetailQuery,
  ShopUserShopDetailQuery,
  ShopUserShopProductQuery,
  ShopUserShopReviewQuery,
];
