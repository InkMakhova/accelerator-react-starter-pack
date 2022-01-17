import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route, Switch} from 'react-router-dom';
import Cart from './cart';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: Cart', () => {
  it('should render Cart correctly', () => {
    render(
      <Router history={history}>
        <Cart />;
      </Router>);

    expect(screen.getByTestId('cart')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to cart url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/cart" exact>
            <h1>This is cart page</h1>
          </Route>
          <Route>
            <Cart />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is cart page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is cart page/i)).toBeInTheDocument();
  });
});
