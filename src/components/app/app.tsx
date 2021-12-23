import {Route, Router as BrowserRouter, Switch} from 'react-router-dom';
import browserHistory from '../../browser-history';
import CatalogPage from '../catalog-page/catalog-page';
import {AppRoute} from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <CatalogPage />;
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
