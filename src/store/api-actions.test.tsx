import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute } from '../const';
import {
  fetchGuitarByAsc,
  fetchGuitarByDesc,
  fetchGuitarsAction, searchGuitarsAction
} from './api-actions';
import {
  loadGuitars,
  loadPriceMax,
  loadPriceMin, loadSearchSuggestions,
  updateTotal
} from './action';
import { mockGuitar } from '../mock/mock-guitar';
import { mockSearchSuggestions } from '../mock/mock-search-suggestion';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Guitars when GET /guitars', async () => {
    const mockGuitars = mockGuitar;

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars, {'x-total-count': 4});

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction({}));

    expect(store.getActions()).toEqual([loadGuitars(mockGuitars), updateTotal(4)]);
  });

  it('should dispatch Min price when GET /guitars?_sort=price&_order=asc&_start=0&_limit=1', async () => {
    const mockGuitars = mockGuitar;

    mockAPI
      .onGet(`${APIRoute.Guitars}?_sort=price&_order=asc&_start=0&_limit=1`)
      .reply(200, [mockGuitar[1]]);

    const store = mockStore();
    await store.dispatch(fetchGuitarByAsc());

    expect(store.getActions()).toEqual([loadPriceMin(mockGuitars[1])]);
  });

  it('should dispatch Max price when GET /guitars?_sort=price&_order=desc&_start=0&_limit=1', async () => {
    const mockGuitars = mockGuitar;

    mockAPI
      .onGet(`${APIRoute.Guitars}?_sort=price&_order=desc&_start=0&_limit=1`)
      .reply(200, [mockGuitar[0]]);

    const store = mockStore();
    await store.dispatch(fetchGuitarByDesc());

    expect(store.getActions()).toEqual([loadPriceMax(mockGuitars[0])]);
  });

  it('should dispatch Search suggestions when GET /guitars?_sort=price&_order=desc&_start=0&_limit=1', async () => {
    const mockSuggestions = mockSearchSuggestions;

    mockAPI
      .onGet(`${APIRoute.Guitars}?name_like=Чест`)
      .reply(200, mockSuggestions);

    const store = mockStore();
    await store.dispatch(searchGuitarsAction('Чест'));

    expect(store.getActions()).toEqual([loadSearchSuggestions(mockSuggestions)]);
  });
});
