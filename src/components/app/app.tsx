import { Route, Router as BrowserRouter, Switch } from 'react-router-dom';
import browserHistory from '../../browser-history';
import CatalogPage from '../catalog-page/catalog-page';
import { AppRoute, NavigationSection } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import UnderConstructionPage from '../under-construction-page/under-construction-page';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <CatalogPage />;
        </Route>
        <Route exact path={AppRoute.Catalog}>
          <CatalogPage />;
        </Route>
        <Route exact path={`${AppRoute.Catalog}${AppRoute.Page}:page`}>
          <CatalogPage />;
        </Route>
        <Route exact path={AppRoute.WhereToBuy}>
          <UnderConstructionPage currentNavigationSection={NavigationSection.WhereToBuy} />;
        </Route>
        <Route exact path={AppRoute.AboutUs}>
          <UnderConstructionPage currentNavigationSection={NavigationSection.AboutUs} />;
        </Route>
        <Route >
          <NotFoundPage />;
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
