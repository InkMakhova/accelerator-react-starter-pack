import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from './cart';

it('should render Cart correctly', () => {
  const {container} = render(
    <Router>
      <Cart />
    </Router>);
  expect(container).toMatchSnapshot();
});
