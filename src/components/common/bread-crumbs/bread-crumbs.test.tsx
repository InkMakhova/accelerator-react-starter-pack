import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BreadCrumbs from './bread-crumbs';

it('should render BreadCrumbs correctly', () => {
  const {container} = render(
    <Router>
      <BreadCrumbs />
    </Router>);
  expect(container).toMatchSnapshot();
});
