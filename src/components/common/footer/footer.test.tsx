import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './footer';

it('should render Footer correctly', () => {
  const {container} = render(
    <Router>
      <Route>
        <Footer />
      </Route>
    </Router>);
  expect(container).toMatchSnapshot();
});
