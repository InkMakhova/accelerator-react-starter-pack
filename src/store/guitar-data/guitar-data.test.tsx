import { mockGuitar } from '../../mock/mock-guitar';
import { guitarData } from './guitar-data';
import { ActionType } from '../../types/action';
import { mockSearchSuggestions } from '../../mock/mock-search-suggestion';

describe('Reducer: Guitar-data', () => {
  it('should update guitars', () => {
    const state = {
      guitars: mockGuitar,
      priceMin: 1700,
      priceMax: 30000,
      searchSuggestions: mockSearchSuggestions,
      total: 4,
    };

    const updateGuitar = {
      type: ActionType.LoadGuitars,
      payload: mockGuitar.slice(0, mockGuitar.length-2),
    };

    expect(guitarData(state, updateGuitar))
      .toEqual({
        guitars: mockGuitar.slice(0, mockGuitar.length-2),
        priceMin: 1700,
        priceMax: 30000,
        searchSuggestions: mockSearchSuggestions,
        total: 4,
      });
  });

  it('should update min price', () => {
    const state = {
      guitars: mockGuitar,
      priceMin: 1700,
      priceMax: 30000,
      searchSuggestions: mockSearchSuggestions,
      total: 4,
    };

    const updatePriceMin = {
      type: ActionType.LoadPriceMin,
      payload: mockGuitar[2],
    };

    expect(guitarData(state, updatePriceMin))
      .toEqual({
        guitars: mockGuitar,
        priceMin: 1900,
        priceMax: 30000,
        searchSuggestions: mockSearchSuggestions,
        total: 4,
      });
  });

  it('should update max price', () => {
    const state = {
      guitars: mockGuitar,
      priceMin: 1700,
      priceMax: 30000,
      searchSuggestions: mockSearchSuggestions,
      total: 4,
    };

    const updatePriceMax = {
      type: ActionType.LoadPriceMax,
      payload: mockGuitar[0],
    };

    expect(guitarData(state, updatePriceMax))
      .toEqual({
        guitars: mockGuitar,
        priceMin: 1700,
        priceMax: 30000,
        searchSuggestions: mockSearchSuggestions,
        total: 4,
      });
  });

  it('should update total guitar number', () => {
    const state = {
      guitars: mockGuitar,
      priceMin: 1700,
      priceMax: 30000,
      searchSuggestions: mockSearchSuggestions,
      total: 4,
    };

    const updateTotal = {
      type: ActionType.UpdateTotal,
      payload: 5,
    };

    expect(guitarData(state, updateTotal))
      .toEqual({
        guitars: mockGuitar,
        priceMin: 1700,
        priceMax: 30000,
        searchSuggestions: mockSearchSuggestions,
        total: 5,
      });
  });

  it('should update search suggestions', () => {
    const state = {
      guitars: mockGuitar,
      priceMin: 1700,
      priceMax: 30000,
      searchSuggestions: mockSearchSuggestions,
      total: 4,
    };

    const updateSearchSuggestions = {
      type: ActionType.LoadSearchSuggestions,
      payload: mockSearchSuggestions.slice(0, mockSearchSuggestions.length-2),
    };

    expect(guitarData(state, updateSearchSuggestions))
      .toEqual({
        guitars: mockGuitar,
        priceMin: 1700,
        priceMax: 30000,
        searchSuggestions: mockSearchSuggestions.slice(0, mockSearchSuggestions.length-2),
        total: 4,
      });
  });
});
