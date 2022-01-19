import { ThunkActionResult } from '../types/action';
import {
  loadGuitars,
  loadPriceMax,
  loadPriceMin,
  loadSearchSuggestions,
  updateTotal } from './action';
import {
  APIRoute,
  PRICE_MAX,
  PRICE_MIN,
  QueryParam } from '../const';
import { Guitar } from '../types/guitar';
import { FetchGuitarsParams } from '../types/fetch-guitars-params';

export const fetchGuitarsAction = (params: FetchGuitarsParams, handleError: () => void): ThunkActionResult => {
  const getQuery = (queryParams: FetchGuitarsParams): string => {
    const {
      start,
      sort,
      order,
      priceMin,
      priceMax,
      types,
      stringCount,
      limit,
    } = queryParams;

    const urlQueryParams = new URLSearchParams('');

    if (priceMin && priceMin !== String(PRICE_MIN)) {
      urlQueryParams.append(QueryParam.PriceMinParam, priceMin);
    }
    if (priceMax && priceMax !== String(PRICE_MAX)) {
      urlQueryParams.append(QueryParam.PriceMaxParam, priceMax);
    }
    if (types && types.length !== 0) {
      types.forEach((el: string) => urlQueryParams.append(QueryParam.TypeParam, el));
    }
    if (stringCount && stringCount.length !== 0) {
      stringCount.forEach((el: string) => urlQueryParams.append(QueryParam.StringCountParam, el));
    }
    if (sort) {
      urlQueryParams.append(QueryParam.SortParam, sort);
    }
    if (order) {
      urlQueryParams.append(QueryParam.OrderParam, order);
    }
    if (start) {
      urlQueryParams.append(QueryParam.StartParam, start);
    }
    if (limit) {
      urlQueryParams.append(QueryParam.LimitParam, limit);
    }

    return urlQueryParams.toString();
  };

  return async (dispatch, _getState, api): Promise<void> => {
    api
      .get<Guitar[]>(`${APIRoute.Guitars}${getQuery(params).length === 0 ? '' : `?${getQuery(params)}`}`)
      .then(({data, headers, status}) => {
        dispatch(loadGuitars(data));
        dispatch(updateTotal(Number(headers['x-total-count'])));
      })
      .catch(() => handleError());
  };
};

export const fetchGuitarByAsc = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?_sort=price&_order=asc&_start=0&_limit=1`);
    dispatch(loadPriceMin(data[0]));
  };

export const fetchGuitarByDesc = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?_sort=price&_order=desc&_start=0&_limit=1`);
    dispatch(loadPriceMax(data[0]));
  };

export const searchGuitarsAction = (name: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?${QueryParam.SearchParam}=${name}`);
    dispatch(loadSearchSuggestions(data));
  };
