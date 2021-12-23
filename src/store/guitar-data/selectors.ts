import {State} from '../../types/state';
import {Guitar} from '../../types/guitar';
import {NameSpace} from '../root-reducer';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.data].guitars;
