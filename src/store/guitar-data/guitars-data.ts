import {GuitarData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {
  loadGuitars
} from '../action';

const initialState: GuitarData = {
  guitars: [],
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});

export {guitarData};
