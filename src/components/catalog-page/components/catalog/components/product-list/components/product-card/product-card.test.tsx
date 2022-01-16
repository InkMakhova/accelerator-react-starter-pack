import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';
import { mockGuitar } from '../../../../../../../../mock/mock-guitar';
import {Route, Router, Switch} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import React from 'react';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: ProductCard', () => {
  it('should render product card correctly', () => {
    render(
      <Router history={history}>
        <ProductCard guitar={mockGuitar}/>
      </Router>,
    );
    expect(screen.getByAltText('Честер Plus')).toBeInTheDocument();
    expect(screen.getByText('Честер Plus')).toBeInTheDocument();
    expect(screen.getByText('30000 ₽')).toBeInTheDocument();
    expect(screen.getByTestId('more')).toBeInTheDocument();
  });

  it('should redirect to guitar page when user clicks link', () => {
    render(
      <Router history={history}>
        <Switch>
          <Route path="/guitars/8" exact>
            <h1>This is guitar page</h1>
          </Route>
          <Route>
            <ProductCard guitar={mockGuitar}/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.getByTestId('more')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('more'));
    expect(history.location.pathname).toBe('/guitars/8');
    expect(screen.getByText('This is guitar page')).toBeInTheDocument();
  });
});
