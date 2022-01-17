import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Catalog from './catalog';
import { mockGuitar } from '../../../../mock/mock-guitar';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Catalog', () => {
  it('should render Catalog correctly', () => {
    const {container} = render(
      <Provider store={mockStore({
        DATA: {minPrice: '1000', maxPrice: '30000'},
      })}
      >
        <Router history={history}>
          <Catalog guitars={mockGuitar}/>
        </Router>
      </Provider>);
    expect(container).toMatchSnapshot();
  });
});
