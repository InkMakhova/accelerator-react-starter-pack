import {RootState} from '../store/root-reducer';
import {Guitar} from './guitar';

export type GuitarData = {
  guitars: Guitar[];
  searchSuggestions: Guitar[];
  total: number;
  start: number;
  page: number;
}

export type State = RootState;
