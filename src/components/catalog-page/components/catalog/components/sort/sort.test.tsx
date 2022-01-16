import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import Sort from './sort';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Sort', () => {
  it('should render Sort correctly', () => {
    render(
      <Router history={history}>
        <Sort />
      </Router>);

    expect(screen.getByTestId('by-price')).toBeInTheDocument();
    expect(screen.getByTestId('by-rating')).toBeInTheDocument();
    expect(screen.getByTestId('asc')).toBeInTheDocument();
    expect(screen.getByTestId('desc')).toBeInTheDocument();
  });

  it('should add query param price when click', () => {
    render(
      <Router history={history}>
        <Sort />
      </Router>);

    userEvent.click(screen.getByTestId('by-price'));
    expect(history.location.search).toBe('?_sort=price');
    userEvent.click(screen.getByTestId('desc'));
    expect(history.location.search).toBe('?_sort=price&_order=desc');
    userEvent.click(screen.getByTestId('by-rating'));
    expect(history.location.search).toBe('?_sort=rating&_order=desc');
  });
});
