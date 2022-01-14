import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from './about-us';

it('should render AboutUs correctly', () => {
  const {container} = render(<AboutUs />);
  expect(container).toMatchSnapshot();
});
