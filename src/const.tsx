export enum Page {
  Catalog = 'Guitar-shop',
  Cart = 'Корзина — Guitar-shop',
}

export enum AppRoute {
  Root = '/',
  Cart = '/cart',
  WhereToBuy = '/where-to-buy',
  AboutUs = '/about-us',
  NotFoundPage = '/page-not-found',
  Guitars = '/guitars/',
}

export enum APIRoute {
  Guitars = '/Guitars',
}

export const ITEMS_PER_PAGE = 9;

export enum Sort {
  Price = 'price',
  Rating = 'rating',
}

export enum Order {
  Asc = 'Asc',
  Desc = 'Desc',
}
