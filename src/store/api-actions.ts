import {ThunkActionResult} from '../types/action';
import {loadGuitars, loadPriceMax, loadPriceMin, loadSearchSuggestions, updateTotal} from './action';
import {APIRoute, PRICE_MAX, PRICE_MIN} from '../const';
import {Guitar} from '../types/guitar';
import {FetchGuitarsParams} from '../types/fetch-guitars-params';
//import {URLSearchParams} from 'url';

export const fetchGuitarsAction = (params: FetchGuitarsParams): ThunkActionResult => {

  const getQuery = (queryParams: FetchGuitarsParams): string => {
    const {
      start,
      sort,
      order,
      priceMin,
      priceMax,
      types,
      //stringsCount,
      limit,
    } = queryParams;

    const urlQueryParams = new URLSearchParams('');
    if (priceMin && priceMin !== String(PRICE_MIN)) {
      urlQueryParams.append('price_gte', priceMin);
    }
    if (priceMax && priceMax !== String(PRICE_MAX)) {
      urlQueryParams.append('price_lte', priceMax);
    }
    if (types && types.length !== 0) {
      types.forEach((el: string) => urlQueryParams.append('type[]', el));
    }
    // if (stringsCount && stringsCount.length !== 0) {
    //   stringsCount.forEach((el: string) => urlQueryParams.append('stringsCount[]', el));
    // }
    if (sort) {
      urlQueryParams.append('_sort', sort);
    }
    if (order) {
      urlQueryParams.append('_order', order);
    }
    if (start) {
      urlQueryParams.append('_start', start);
    }
    if (limit) {
      urlQueryParams.append('_limit', limit);
    }

    return urlQueryParams.toString();
  };

  return async (dispatch, _getState, api): Promise<void> => {
    const {data, headers} = await api.get<Guitar[]>(`${APIRoute.Guitars}${getQuery(params).length === 0 ? '' : `?${getQuery(params)}`}`);
    dispatch(loadGuitars(data));
    dispatch(updateTotal(Number(headers['x-total-count'])));
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
    const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?name_like=${name}`);
    dispatch(loadSearchSuggestions(data));
  };
