import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './navigation';
import {NavigationSection} from '../../../../../const';

it('should render Navigation correctly', () => {
  const {container} = render(
    <Router>
      <Navigation currentNavigationSection={NavigationSection.Catalog}/>
    </Router>);
  expect(container).toMatchSnapshot();
});
