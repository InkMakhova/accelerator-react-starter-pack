import {ThunkActionResult} from '../types/action';
import {loadGuitars, loadSearchSuggestions, updateTotal} from './action';
import {APIRoute, PRODUCT_NUMBER_ON_PAGE} from '../const';
import {Guitar} from '../types/guitar';

export const fetchGuitarsAction = (start: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data, headers} = await api.get<Guitar[]>(`${APIRoute.Guitars}?_start=${start}&_limit=${PRODUCT_NUMBER_ON_PAGE}`);
    dispatch(loadGuitars(data));
    dispatch(updateTotal(Number(headers['x-total-count'])));
  };

export const searchGuitarsAction = (name: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?name_like=${name}`);
    dispatch(loadSearchSuggestions(data));
  };

