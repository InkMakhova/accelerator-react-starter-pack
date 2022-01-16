import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockGuitar } from '../../mock/mock-guitar';
import { mockSearchSuggestions } from '../../mock/mock-search-suggestion';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './app';
import { AppRoute } from '../../const';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    guitars: mockGuitar,
    priceMin: 1000,
    priceMax: 30000,
    searchSuggestions: mockSearchSuggestions,
    total: 29,
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });

  it('should render "WhereToBuy" when user navigate to "/where-to-buy"', () => {
    history.push(AppRoute.WhereToBuy);
    render(fakeApp);

    expect(screen.getByText('Страница находится в разработке')).toBeInTheDocument();
  });

  it('should render "AboutUs" when user navigate to "/about-us"', () => {
    history.push(AppRoute.AboutUs);
    render(fakeApp);

    expect(screen.getByText('Страница находится в разработке')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Вернуться в меню каталога')).toBeInTheDocument();
  });
});
