import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Logo from './logo';
import { Route } from 'react-router-dom';

it('should render Logo correctly', () => {
  const {container} = render(
    <Router>
      <Route>
        <Logo />;
      </Route>
    </Router>);
  expect(container).toMatchSnapshot();
});
