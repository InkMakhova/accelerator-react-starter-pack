import {RootState} from '../store/root-reducer';
import {Guitar} from './guitar';

export type GuitarData = {
  guitars: Guitar[];
}

export type State = RootState;
