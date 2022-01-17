import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Header from './header';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();
const history = createMemoryHistory();

it('should render Header correctly', () => {
  const {container} = render(
    <Provider store={mockStore({
      DATA: {searchSuggestions: []},
    })}
    >
      <Router history={history}>
        <Header currentNavigationSection={'catalog'}/>
      </Router>
    </Provider>);
  expect(container).toMatchSnapshot();
});
