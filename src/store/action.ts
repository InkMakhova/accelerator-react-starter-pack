import { ActionType } from '../types/action';
import { createAction } from '@reduxjs/toolkit';
import { Guitar } from '../types/guitar';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const loadPriceMin = createAction(
  ActionType.LoadPriceMin,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const loadPriceMax = createAction(
  ActionType.LoadPriceMax,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

export const loadSearchSuggestions = createAction(
  ActionType.LoadSearchSuggestions,
  (searchSuggestions: Guitar[]) => ({
    payload: searchSuggestions,
  }),
);

export const updateTotal = createAction(
  ActionType.UpdateTotal,
  (total: number) => ({
    payload: total,
  }),
);
