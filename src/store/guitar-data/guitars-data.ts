import {GuitarData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {
  loadGuitars, updateTotal
} from '../action';

const initialState: GuitarData = {
  guitars: [],
  total: 0,
  start: 0,
  page: 1,
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(updateTotal, (state, action) => {
      state.total = action.payload;
    });
});

export {guitarData};
