import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Logo from './logo';

it('should render Logo correctly', () => {
  const {container} = render(
    <Router>
      <Logo />;
    </Router>);
  expect(container).toMatchSnapshot();
});
