import React from 'react';
import { render } from '@testing-library/react';
import Contacts from './contacts';

it('should render Contacts correctly', () => {
  const {container} = render(<Contacts />);
  expect(container).toMatchSnapshot();
});
