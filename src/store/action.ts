import {ActionType} from '../types/action';
import {createAction} from '@reduxjs/toolkit';
import {Guitar} from '../types/guitar';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);
