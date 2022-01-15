import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import UnderConstructionPage from './under-construction-page';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UnderConstructionPage', () => {
  it('should render UnderConstructionPage correctly', () => {
    render(
      <Provider store={mockStore({
        DATA: {searchSuggestions: []},
      })}
      >
        <Router history={history}>
          <UnderConstructionPage currentNavigationSection={'aboutUs'}/>
        </Router>
      </Provider>);

    expect(screen.getByText('Страница находится в разработке')).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в меню каталога/)).toBeInTheDocument();
    expect(screen.getByTestId('go-back')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Provider store={mockStore({
        DATA: {searchSuggestions: []},
      })}
      >
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <UnderConstructionPage currentNavigationSection={'aboutUs'}/>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('go-back'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
