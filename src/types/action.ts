import { Action } from 'redux';
import {
  ThunkAction,
  ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadPriceMin = 'data/loadPriceMin',
  LoadPriceMax = 'data/loadPriceMax',
  UpdateTotal = 'data/updateTotal',
  LoadSearchSuggestions = 'data/loadSearchSuggestions',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
