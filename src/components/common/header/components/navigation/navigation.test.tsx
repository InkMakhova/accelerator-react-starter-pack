import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './navigation';
import { NavigationSection } from '../../../../../const';

it('should render Navigation correctly', () => {
  render(
    <Router>
      <Navigation currentNavigationSection={NavigationSection.Catalog}/>
    </Router>);

  expect(screen.getByTestId('catalog')).toBeInTheDocument();
  expect(screen.getByTestId('whereToBuy')).toBeInTheDocument();
  expect(screen.getByTestId('aboutUs')).toBeInTheDocument();
  expect(screen.getByText('Каталог')).toBeInTheDocument();
  expect(screen.getByText('Где купить?')).toBeInTheDocument();
  expect(screen.getByText('О компании')).toBeInTheDocument();
});
