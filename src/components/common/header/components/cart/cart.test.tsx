import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cart from './cart';

it('should render Cart correctly', () => {
  const {container} = render(
    <Router>
      <Route>
        <Cart />
      </Route>
    </Router>);
  expect(container).toMatchSnapshot();
});
