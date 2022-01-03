import {ThunkActionResult} from '../types/action';
import {loadGuitars, loadPriceMax, loadPriceMin, loadSearchSuggestions, updateTotal} from './action';
import {APIRoute, ITEMS_PER_PAGE, Order, PRICE_MAX, PRICE_MIN, Sort} from '../const';
import {Guitar} from '../types/guitar';
import {FetchGuitarsParams} from '../types/fetch-guitars-params';

export const fetchGuitarsAction = (params: FetchGuitarsParams): ThunkActionResult => {
  const {
    start = 0,
    sort = Sort.Price,
    order = Order.Asc,
    priceMin = PRICE_MIN,
    priceMax = PRICE_MAX,
  } = params;


  // const getQuery = (queryParams: FetchGuitarsParams) => {
  //   const {
  //     start,
  //     sort,
  //     order,
  //     priceMin,
  //     priceMax,
  //   } = queryParams;
  //
  //   const urlParams = new URLSearchParams({
  //     'price_gte': priceMin,
  //     'price_lte': priceMax,
  //     '_sort': sort,
  //     '_order': order,
  //     '_start': start,
  //   }).toString();
  //
  //   return urlParams;
  // }

  return async (dispatch, _getState, api): Promise<void> => {
    const {data, headers} = await api.get<Guitar[]>(`${APIRoute.Guitars}${priceMin !== 0 ? `?price_gte=${priceMin}` : ''}&price_lte=${priceMax}&_sort=${sort}&_order=${order}&_start=${start}&_limit=${ITEMS_PER_PAGE}`);
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
