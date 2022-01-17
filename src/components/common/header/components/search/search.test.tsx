import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Search from './search';
import { mockSearchSuggestions } from '../../../../../mock/mock-search-suggestion';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Search', () => {
  test('it displays search suggestions', async () => {
    render(
      <Provider store={mockStore({
        DATA: {searchSuggestions: mockSearchSuggestions},
      })}
      >
        <Router history={history}>
          <Search />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('search'), 'Чест');

    expect(screen.getByTestId(/search-suggestion-list/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/search-suggestion-item/i)).toHaveLength(3);
    expect(screen.getByText(/Честер Plus/)).toBeInTheDocument();
    expect(screen.getByText(/Честер 6V/)).toBeInTheDocument();
  });
});
