import { RootState } from '../store/root-reducer';
import { Guitar } from './guitar';

export type GuitarData = {
  guitars: Guitar[];
  priceMin: number;
  priceMax: number,
  searchSuggestions: Guitar[];
  total: number;
}

export type State = RootState;
