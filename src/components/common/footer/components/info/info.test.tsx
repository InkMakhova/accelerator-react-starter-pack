import React from 'react';
import { render } from '@testing-library/react';
import Info from './info';

it('should render Info correctly', () => {
  const {container} = render(<Info />);
  expect(container).toMatchSnapshot();
});
