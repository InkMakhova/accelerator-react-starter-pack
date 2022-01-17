import { GuitarData } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import {
  loadGuitars,
  loadPriceMax,
  loadPriceMin,
  loadSearchSuggestions,
  updateTotal } from '../action';

const initialState: GuitarData = {
  guitars: [],
  priceMin: 0,
  priceMax: 0,
  searchSuggestions: [],
  total: 0,
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadPriceMin, (state, action) => {
      state.priceMin = action.payload.price;
    })
    .addCase(loadPriceMax, (state, action) => {
      state.priceMax = action.payload.price;
    })
    .addCase(loadSearchSuggestions, (state, action) => {
      state.searchSuggestions = action.payload;
    })
    .addCase(updateTotal, (state, action) => {
      state.total = action.payload;
    });
});

export { guitarData };
