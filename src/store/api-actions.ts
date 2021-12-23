import {ThunkActionResult} from '../types/action';
import {loadGuitars} from './action';
import {APIRoute} from '../const';
import {Guitar} from '../types/guitar';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
    dispatch(loadGuitars(data));
  };
