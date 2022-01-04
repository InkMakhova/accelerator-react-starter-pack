export type FetchGuitarsParams = {
  priceMin?: string | null,
  priceMax?: string | null,
  start?: string | null,
  sort?: string | null,
  order?: string | null,
  types?: string[] | null,
  stringsCount?: string[],
  limit: string;
}
