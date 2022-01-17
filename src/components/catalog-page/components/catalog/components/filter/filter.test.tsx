import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import Filter from './filter';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Filter', () => {
  it('should render Filter correctly', () => {
    render(
      <Provider store={mockStore(
        {DATA: {priceMin: '1000', priceMax: '30000'}},
      )}
      >
        <Router history={history}>
          <Filter />
        </Router>
      </Provider>);

    expect(screen.getByTestId('min-price')).toBeInTheDocument();
    expect(screen.getByTestId('max-price')).toBeInTheDocument();
    expect(screen.getByTestId('acoustic')).toBeInTheDocument();
    expect(screen.getByTestId('electric')).toBeInTheDocument();
    expect(screen.getByTestId('ukulele')).toBeInTheDocument();
    expect(screen.getByTestId('four')).toBeInTheDocument();
    expect(screen.getByTestId('six')).toBeInTheDocument();
    expect(screen.getByTestId('seven')).toBeInTheDocument();
    expect(screen.getByTestId('twelve')).toBeInTheDocument();
  });

  it('should add or delete query param when print price or click types and string length', () => {
    render(
      <Provider store={mockStore(
        {DATA: {priceMin: 1000, priceMax: 30000}},
      )}
      >
        <Router history={history}>
          <Filter />
        </Router>
      </Provider>);

    const minPrice = screen.getByTestId('min-price');
    const maxPrice = screen.getByTestId('max-price');

    const acousticElement = screen.getByTestId('acoustic');
    const electricElement = screen.getByTestId('electric');
    const ukuleleElement = screen.getByTestId('ukulele');

    const fourStringsElement = screen.getByTestId('four');
    const sevenStringsElement = screen.getByTestId('seven');

    userEvent.clear(minPrice);
    userEvent.type(minPrice, '500');
    userEvent.tab();
    expect(history.location.search).toBe('?price_gte=1000');

    userEvent.clear(minPrice);
    userEvent.type(minPrice, '31000');
    userEvent.tab();
    expect(history.location.search).toBe('?price_gte=30000');

    userEvent.clear(minPrice);
    userEvent.type(minPrice, '10000');
    userEvent.tab();
    expect(history.location.search).toBe('?price_gte=10000');

    userEvent.clear(maxPrice);
    userEvent.type(maxPrice, '100');
    userEvent.tab();
    expect(history.location.search).toBe('?price_gte=10000&price_lte=10000');

    userEvent.clear(maxPrice);
    userEvent.type(maxPrice, '100500');
    userEvent.tab();
    expect(history.location.search).toBe('?price_gte=10000&price_lte=30000');

    userEvent.click(acousticElement);
    expect(history.location.search).toBe('?price_gte=10000&price_lte=30000&type%5B%5D=acoustic');

    userEvent.click(acousticElement);
    expect(history.location.search).toBe('?price_gte=10000&price_lte=30000');

    userEvent.click(acousticElement);
    userEvent.click(electricElement);
    expect(history.location.search)
      .toBe('?price_gte=10000&price_lte=30000&type%5B%5D=acoustic&type%5B%5D=electric');

    userEvent.clear(maxPrice);
    userEvent.tab();
    userEvent.click(acousticElement);
    expect(history.location.search).toBe('?price_gte=10000&type%5B%5D=electric');

    userEvent.clear(minPrice);
    userEvent.tab();
    userEvent.click(ukuleleElement);
    expect(history.location.search).toBe('?type%5B%5D=electric&type%5B%5D=ukulele');

    userEvent.type(minPrice, '800');
    userEvent.tab();
    userEvent.click(ukuleleElement);
    userEvent.click(fourStringsElement);
    userEvent.click(sevenStringsElement);
    expect(history.location.search).toBe('?price_gte=1000&type%5B%5D=electric&stringCount%5B%5D=4&stringCount%5B%5D=7');
  });

  it('should disable string number element when in guitar type it doesn\t exist', () => {
    render(
      <Provider store={mockStore(
        {DATA: {priceMin: 1000, priceMax: 30000}},
      )}
      >
        <Router history={history}>
          <Filter/>
        </Router>
      </Provider>);

    const acousticElement = screen.getByTestId('acoustic');
    const electricElement = screen.getByTestId('electric');
    const ukuleleElement = screen.getByTestId('ukulele');

    const fourStringsElement = screen.getByTestId('four');
    const sixStringsElement = screen.getByTestId('six');
    const sevenStringsElement = screen.getByTestId('seven');
    const twelveStringsElement = screen.getByTestId('twelve');

    userEvent.click(ukuleleElement);
    userEvent.click(electricElement);
    expect(fourStringsElement).not.toHaveAttribute('disabled');
    expect(sixStringsElement).toHaveAttribute('disabled');
    expect(sevenStringsElement).toHaveAttribute('disabled');
    expect(twelveStringsElement).toHaveAttribute('disabled');

    userEvent.click(ukuleleElement);
    userEvent.click(acousticElement);
    expect(fourStringsElement).toHaveAttribute('disabled');
    expect(twelveStringsElement).not.toHaveAttribute('disabled');

    userEvent.click(ukuleleElement);
    userEvent.click(acousticElement);
    userEvent.click(electricElement);
    expect(fourStringsElement).not.toHaveAttribute('disabled');
    expect(sixStringsElement).not.toHaveAttribute('disabled');
    expect(sevenStringsElement).not.toHaveAttribute('disabled');
    expect(twelveStringsElement).toHaveAttribute('disabled');
  });
});
