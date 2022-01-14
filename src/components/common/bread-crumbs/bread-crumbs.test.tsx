import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BreadCrumbs from './bread-crumbs';

it('should render BreadCrumbs correctly', () => {
  const {container} = render(
    <Router>
      <Route>
        <BreadCrumbs />
      </Route>
    </Router>);
  expect(container).toMatchSnapshot();
});
