export enum PageTitle {
  Catalog = 'Guitar-shop',
  Cart = 'Корзина — Guitar-shop',
}

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Page = '/page_',
  Cart = '/cart',
  WhereToBuy = '/where-to-buy',
  AboutUs = '/about-us',
  NotFoundPage = '/page-not-found',
  Guitars = '/guitars/',
}

export enum APIRoute {
  Guitars = '/Guitars',
}

export enum QueryParam {
  SortParam = '_sort',
  OrderParam = '_order',
  PriceMinParam = 'price_gte',
  PriceMaxParam = 'price_lte',
  TypeParam = 'type[]',
  StringCountParam = 'stringCount[]',
  StartParam = '_start',
  LimitParam = '_limit',
  SearchParam = 'name_like',
}

export const ITEMS_PER_PAGE = 9;

export const PAGINATION_STEP = 3;

export enum Sort {
  Price = 'price',
  Rating = 'rating',
}

export enum Order {
  Asc = 'Asc',
  Desc = 'Desc',
}

export enum Type {
  Acoustic= 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum StringCount {
  Four = 4,
  Six = 6,
  Seven = 7,
  Twelve = 12,
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 0;
