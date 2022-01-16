import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import CatalogPage from './catalog-page';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CatalogPage', () => {
  it('should render CatalogPage correctly', () => {
    const {container} = render(
      <Provider store={mockStore({
        DATA: {minPrice: '1000', maxPrice: '30000'},
      })}
      >
        <Router history={history}>
          <CatalogPage />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
