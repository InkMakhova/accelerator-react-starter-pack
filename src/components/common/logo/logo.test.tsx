import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import Logo from './logo';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render Logo correctly', () => {
    render(
      <Router history={history}>
        <Logo />;
      </Router>);

    expect(screen.getByAltText(/Логотип/)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});

