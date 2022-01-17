import React from 'react';
import { render } from '@testing-library/react';
import SocialMedia from './social-media';

it('should render SocialMedia correctly', () => {
  const {container} = render(<SocialMedia />);
  expect(container).toMatchSnapshot();
});
