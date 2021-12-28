import {ThunkActionResult} from '../types/action';
import {loadGuitars, loadSearchSuggestions, updateTotal} from './action';
import {APIRoute, ITEMS_PER_PAGE, Order, Sort} from '../const';
import {Guitar} from '../types/guitar';
import {FetchGuitarsParams} from '../types/fetch-guitars-params';

export const fetchGuitarsAction = (params: FetchGuitarsParams): ThunkActionResult => {
  const {
    start = 0,
    sort = Sort.Price,
    order = Order.Asc,
  } = params;

  return async (dispatch, _getState, api): Promise<void> => {
    const {data, headers} = await api.get<Guitar[]>(`${APIRoute.Guitars}?_sort=${sort}&_order=${order}&_start=${start}&_limit=${ITEMS_PER_PAGE}`);
    dispatch(loadGuitars(data));
    dispatch(updateTotal(Number(headers['x-total-count'])));
  };
};

export const searchGuitarsAction = (name: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?name_like=${name}`);
    dispatch(loadSearchSuggestions(data));
  };
