import { render, screen } from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import Pagination from './pagination';
import { createMemoryHistory } from 'history';
import React from 'react';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render Pagination correctly with total page number is 30 and current page is 3', () => {
    history.location.pathname = '/catalog/page_3';

    render(
      <Router history={history}>
        <Route>
          <Pagination totalPageNumber={30} />
        </Route>
      </Router>);

    expect(screen.queryByTestId('prev')).not.toBeInTheDocument();
    expect(screen.getByTestId('1')).toBeInTheDocument();
    expect(screen.getByTestId('3')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
  });

  it('should render Pagination correctly with total page number is 2 and current page is 2', () => {
    history.location.pathname = '/catalog/page_2';

    render(
      <Router history={history}>
        <Route>
          <Pagination totalPageNumber={2} />
        </Route>
      </Router>);

    expect(screen.queryByTestId('prev')).not.toBeInTheDocument();
    expect(screen.getByTestId('1')).toBeInTheDocument();
    expect(screen.getByTestId('2')).toBeInTheDocument();
    expect(screen.queryByTestId('next')).not.toBeInTheDocument();
  });

  it('should render Pagination correctly with total page number is 29 and current page is 28', () => {
    history.location.pathname = '/catalog/page_28';

    render(
      <Router history={history}>
        <Route>
          <Pagination totalPageNumber={29} />
        </Route>
      </Router>);

    expect(screen.getByTestId('prev')).toBeInTheDocument();
    expect(screen.getByTestId('28')).toBeInTheDocument();
    expect(screen.getByTestId('29')).toBeInTheDocument();
    expect(screen.queryByTestId('next')).not.toBeInTheDocument();
  });

  it('should render Pagination correctly with total page number is 29 and current page is 20', () => {
    history.location.pathname = '/catalog/page_20';

    render(
      <Router history={history}>
        <Route>
          <Pagination totalPageNumber={29} />
        </Route>
      </Router>);

    expect(screen.getByTestId('prev')).toBeInTheDocument();
    expect(screen.getByTestId('20')).toBeInTheDocument();
    expect(screen.getByTestId('21')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
  });

  it('should redirect to another page when user click prev button', () => {
    history.location.pathname = '/catalog/page_20';

    render(
      <Router history={history}>
        <Switch>
          <Route>
            <Pagination totalPageNumber={29} />
          </Route>
          <Route path={'/catalog/page_18'}>
            <h1>This is page 18</h1>
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.getByTestId('20')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('prev'));
    expect(screen.queryByTestId('20')).not.toBeInTheDocument();
    expect(screen.getByTestId('18')).toBeInTheDocument();
  });

  it('should redirect to another page when user click next button', () => {
    history.location.pathname = '/catalog/page_20';

    render(
      <Router history={history}>
        <Switch>
          <Route>
            <Pagination totalPageNumber={29} />
          </Route>
          <Route path={'/catalog/page_22'}>
            <h1>This is page 22</h1>
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.getByTestId('20')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('next'));
    expect(screen.queryByTestId('20')).not.toBeInTheDocument();
    expect(screen.getByTestId('22')).toBeInTheDocument();
  });
});
