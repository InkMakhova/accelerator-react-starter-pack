import {State} from '../../types/state';
import {Guitar} from '../../types/guitar';
import {NameSpace} from '../root-reducer';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.data].guitars;
export const getPriceMin = (state: State): number => state[NameSpace.data].priceMin;
export const getPriceMax = (state: State): number => state[NameSpace.data].priceMax;
export const getSearchSuggestions = (state: State): Guitar[] => state[NameSpace.data].searchSuggestions;
export const getTotal = (state: State): number => state[NameSpace.data].total;
export const getStart = (state: State): number => state[NameSpace.data].start;
