import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './footer';

it('should render Footer correctly', () => {
  const {container} = render(
    <Router>
      <Footer />
    </Router>);
  expect(container).toMatchSnapshot();
});
